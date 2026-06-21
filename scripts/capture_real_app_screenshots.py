import base64
import json
import os
import socket
import struct
import subprocess
import time
import urllib.request
import urllib.parse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "00_Notes" / "real_app_screenshots"
ASSET_DIR.mkdir(parents=True, exist_ok=True)
CHROME_USER_DIR = ROOT / ".tmp-chrome-screenshots"
PORT = 9223
BASE_URL = "http://localhost:3000"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")


def make_demo_xray(path: Path):
    W, H = 900, 720
    im = Image.new("L", (W, H), 18)
    d = ImageDraw.Draw(im)
    for r in range(330, 50, -16):
        val = int(32 + (330 - r) * 0.32)
        d.ellipse((W/2-r*.82, H/2-r*.98, W/2+r*.82, H/2+r*.98), fill=val)
    d.ellipse((185, 155, 430, 580), fill=45)
    d.ellipse((470, 155, 715, 580), fill=45)
    for i in range(9):
        y = 165 + i*43
        d.arc((105, y-35, 465, y+70), 190, 345, fill=132, width=5)
        d.arc((435, y-35, 795, y+70), 195, 350, fill=132, width=5)
    d.rounded_rectangle((422, 80, 478, 650), radius=22, fill=126)
    for y in range(120, 625, 44):
        d.line((416, y, 484, y), fill=175, width=3)
    d.arc((170, 80, 455, 210), 195, 340, fill=178, width=7)
    d.arc((445, 80, 730, 210), 200, 345, fill=178, width=7)
    im = im.filter(ImageFilter.GaussianBlur(1.5))
    rgb = Image.merge("RGB", (im, im, im))
    rgb.save(path)


def start_chrome():
    if not CHROME.exists():
        raise RuntimeError(f"Chrome not found at {CHROME}")
    CHROME_USER_DIR.mkdir(exist_ok=True)
    args = [
        str(CHROME),
        "--headless=new",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={CHROME_USER_DIR}",
        "--window-size=1600,1000",
        "--force-device-scale-factor=1",
        "--disable-gpu",
        "--no-first-run",
        "--disable-extensions",
        "about:blank",
    ]
    proc = subprocess.Popen(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=0.5).read()
            return proc
        except Exception:
            time.sleep(0.25)
    proc.terminate()
    raise RuntimeError("Chrome DevTools endpoint did not start")


def create_target(url: str):
    req = urllib.request.Request(f"http://127.0.0.1:{PORT}/json/new?{urllib.parse.quote(url, safe='')}", method="PUT")
    return json.loads(urllib.request.urlopen(req, timeout=5).read().decode("utf-8"))


class CDP:
    def __init__(self, ws_url):
        assert ws_url.startswith("ws://")
        rest = ws_url[5:]
        hostport, path = rest.split("/", 1)
        host, port = hostport.split(":")
        self.sock = socket.create_connection((host, int(port)), timeout=10)
        self.sock.settimeout(60)
        key = base64.b64encode(os.urandom(16)).decode()
        request = (
            f"GET /{path} HTTP/1.1\r\n"
            f"Host: {hostport}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(request.encode())
        response = self.sock.recv(4096)
        if b"101" not in response.split(b"\r\n", 1)[0]:
            raise RuntimeError(f"WebSocket handshake failed: {response[:200]!r}")
        self.next_id = 1

    def _send_frame(self, payload: bytes):
        header = bytearray([0x81])
        n = len(payload)
        if n < 126:
            header.append(0x80 | n)
        elif n < 65536:
            header.append(0x80 | 126)
            header.extend(struct.pack("!H", n))
        else:
            header.append(0x80 | 127)
            header.extend(struct.pack("!Q", n))
        mask = os.urandom(4)
        header.extend(mask)
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(header + masked)

    def _recv_exact(self, n):
        chunks = []
        while n:
            chunk = self.sock.recv(n)
            if not chunk:
                raise RuntimeError("socket closed")
            chunks.append(chunk)
            n -= len(chunk)
        return b"".join(chunks)

    def _recv_message(self):
        first = self._recv_exact(2)
        b1, b2 = first
        opcode = b1 & 0x0F
        length = b2 & 0x7F
        if length == 126:
            length = struct.unpack("!H", self._recv_exact(2))[0]
        elif length == 127:
            length = struct.unpack("!Q", self._recv_exact(8))[0]
        masked = b2 & 0x80
        mask = self._recv_exact(4) if masked else b""
        payload = self._recv_exact(length)
        if masked:
            payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        if opcode == 8:
            raise RuntimeError("websocket closed")
        if opcode == 9:  # ping
            return self._recv_message()
        return payload.decode("utf-8")

    def call(self, method, params=None, timeout=30):
        msg_id = self.next_id
        self.next_id += 1
        self._send_frame(json.dumps({"id": msg_id, "method": method, "params": params or {}}).encode("utf-8"))
        end = time.time() + timeout
        while time.time() < end:
            msg = json.loads(self._recv_message())
            if msg.get("id") == msg_id:
                if "error" in msg:
                    raise RuntimeError(f"CDP error for {method}: {msg['error']}")
                return msg.get("result", {})
        raise TimeoutError(method)

    def eval(self, expression, await_promise=True, timeout=30):
        return self.call("Runtime.evaluate", {
            "expression": expression,
            "awaitPromise": await_promise,
            "returnByValue": True,
            "userGesture": True,
        }, timeout=timeout)

    def navigate(self, url):
        self.call("Page.navigate", {"url": url})
        self.wait_ready()

    def wait_ready(self, timeout=20):
        end = time.time() + timeout
        while time.time() < end:
            try:
                state = self.eval("document.readyState", timeout=2).get("result", {}).get("value")
                if state == "complete":
                    time.sleep(1.0)
                    return
            except Exception:
                pass
            time.sleep(0.25)
        raise TimeoutError("document not ready")

    def wait_for(self, expression, timeout=20):
        end = time.time() + timeout
        while time.time() < end:
            try:
                val = self.eval(expression, timeout=2).get("result", {}).get("value")
                if val:
                    return val
            except Exception:
                pass
            time.sleep(0.35)
        raise TimeoutError(f"Timed out waiting for: {expression[:80]}")

    def screenshot(self, path: Path):
        data = self.call("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False}, timeout=10)["data"]
        path.write_bytes(base64.b64decode(data))


def js_string(s: str):
    return json.dumps(s)


def main():
    xray = ASSET_DIR / "demo_chest_xray.png"
    make_demo_xray(xray)
    b64 = base64.b64encode(xray.read_bytes()).decode("ascii")
    diagnosis = "Patient ID: XR-2042\nFindings: mild lower-zone opacity detected.\nDiagnosis: possible early bronchopneumonia.\nRecommendation: clinical correlation and follow-up chest review."

    proc = start_chrome()
    try:
        target = create_target(f"{BASE_URL}/sign-up")
        cdp = CDP(target["webSocketDebuggerUrl"])
        cdp.call("Page.enable")
        cdp.call("Runtime.enable")
        cdp.call("Emulation.setDeviceMetricsOverride", {"width": 1600, "height": 1000, "deviceScaleFactor": 1, "mobile": False})
        cdp.wait_ready()

        email = f"samson.defense.{int(time.time())}@demo.local"
        auth_js = f"""
        (async () => {{
          const payload = {{ email: {js_string(email)}, password: 'Password123!', name: 'Dr. Sam', callbackURL: '/dashboard' }};
          let res = await fetch('http://localhost:3000/api/auth/sign-up/email', {{ method: 'POST', headers: {{ 'content-type': 'application/json' }}, credentials: 'include', body: JSON.stringify(payload) }});
          if (!res.ok) {{
            res = await fetch('http://localhost:3000/api/auth/sign-in/email', {{ method: 'POST', headers: {{ 'content-type': 'application/json' }}, credentials: 'include', body: JSON.stringify({{ email: payload.email, password: payload.password, callbackURL: '/dashboard' }}) }});
          }}
          await new Promise(r => setTimeout(r, 1000));
          location.href = 'http://localhost:3000/dashboard';
          return {{ ok: res.ok, status: res.status }};
        }})()
        """
        print("auth", cdp.eval(auth_js, timeout=20).get("result", {}).get("value"))
        cdp.wait_ready()
        cdp.wait_for("document.body.innerText.includes('Welcome back') || location.pathname.includes('dashboard')", timeout=20)

        # Encryption lab screenshot
        cdp.navigate(f"{BASE_URL}/encryption-lab")
        cdp.wait_for("document.body.innerText.includes('Encryption Lab')", timeout=20)
        upload_js = f"""
        (async () => {{
          const input = document.querySelector('input[type=file]');
          const blob = await (await fetch('data:image/png;base64,{b64}')).blob();
          const file = new File([blob], 'Chest_Xray_Demo.png', {{ type: 'image/png' }});
          const dt = new DataTransfer();
          dt.items.add(file);
          input.files = dt.files;
          input.dispatchEvent(new Event('change', {{ bubbles: true }}));
          await new Promise(r => setTimeout(r, 1000));
          const ta = document.querySelector('textarea');
          const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
          setter.call(ta, {js_string(diagnosis)});
          ta.dispatchEvent(new Event('input', {{ bubbles: true }}));
          await new Promise(r => setTimeout(r, 700));
          [...document.querySelectorAll('button')].find(b => b.innerText.includes('ENCODE DATA'))?.click();
          return {{ uploaded: !!input.files.length, textarea: ta.value.length }};
        }})()
        """
        print("encrypt setup", cdp.eval(upload_js, timeout=20).get("result", {}).get("value"))
        cdp.wait_for("document.body.innerText.includes('Encryption Successful')", timeout=30)
        enc_path = ASSET_DIR / "real_encryption_lab.png"
        cdp.screenshot(enc_path)
        print("saved", enc_path)

        stego_js = """
        (async () => {
          const a = [...document.querySelectorAll('a')].find(x => x.download && x.href.startsWith('blob:'));
          if (!a) return null;
          const blob = await (await fetch(a.href)).blob();
          const arr = new Uint8Array(await blob.arrayBuffer());
          let binary = '';
          for (let i = 0; i < arr.length; i += 0x8000) binary += String.fromCharCode(...arr.subarray(i, i + 0x8000));
          return btoa(binary);
        })()
        """
        stego_b64 = cdp.eval(stego_js, timeout=20).get("result", {}).get("value")
        if not stego_b64:
            raise RuntimeError("Could not extract stego output from browser")
        (ASSET_DIR / "stego_output_from_browser.png").write_bytes(base64.b64decode(stego_b64))

        # Decryption lab screenshot
        cdp.navigate(f"{BASE_URL}/decryption-lab")
        cdp.wait_for("document.body.innerText.includes('Decryption Lab')", timeout=20)
        decrypt_js = f"""
        (async () => {{
          const input = document.querySelector('input[type=file]');
          const blob = await (await fetch('data:image/png;base64,{stego_b64}')).blob();
          const file = new File([blob], 'encrypted_Chest_Xray_Demo.png', {{ type: 'image/png' }});
          const dt = new DataTransfer();
          dt.items.add(file);
          input.files = dt.files;
          input.dispatchEvent(new Event('change', {{ bubbles: true }}));
          return {{ uploaded: !!input.files.length }};
        }})()
        """
        print("decrypt setup", cdp.eval(decrypt_js, timeout=20).get("result", {}).get("value"))
        cdp.wait_for("document.body.innerText.includes('Decryption Successful')", timeout=30)
        dec_path = ASSET_DIR / "real_decryption_lab.png"
        cdp.screenshot(dec_path)
        print("saved", dec_path)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    main()
