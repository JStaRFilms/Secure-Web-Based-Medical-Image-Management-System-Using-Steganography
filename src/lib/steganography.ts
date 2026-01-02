export class GlobalSteganography {

    // Text <-> Binary Utils
    private static textToBinary(text: string): string {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join('') + '00000000'; // Null terminator
    }

    private static binaryToText(binary: string): string {
        const bytes = binary.match(/.{1,8}/g) || [];
        let text = '';
        for (const byte of bytes) {
            if (byte === '00000000') break;
            text += String.fromCharCode(parseInt(byte, 2));
        }
        return text;
    }

    // --- ENCRYPTION (AES-GCM) ---

    // Generate a key from a password
    private static async getCryptoKey(password: string): Promise<CryptoKey> {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: enc.encode("BigSamSalt"), // In prod, random salt stored with data is better
                iterations: 100000,
                hash: "SHA-256",
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    static async encrypt(text: string, password: string): Promise<string> {
        const key = await this.getCryptoKey(password);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encodedText = new TextEncoder().encode(text);

        const encryptedBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encodedText
        );

        // Pack IV + Ciphertext into JSON string to transport both
        const packageData = {
            iv: Array.from(iv),
            data: Array.from(new Uint8Array(encryptedBuffer))
        };

        return "ENC:" + JSON.stringify(packageData);
    }

    static async decrypt(packagedText: string, password: string): Promise<string> {
        if (!packagedText.startsWith("ENC:")) {
            throw new Error("Not an encrypted package.");
        }

        const jsonStr = packagedText.replace("ENC:", "");
        const pkg = JSON.parse(jsonStr);

        const key = await this.getCryptoKey(password);
        const iv = new Uint8Array(pkg.iv);
        const data = new Uint8Array(pkg.data);

        const decryptedBuffer = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            data
        );

        return new TextDecoder().decode(decryptedBuffer);
    }

    // --- MAIN ---

    /**
     * Encodes a message into an image's pixel data using LSB.
     * Supports optional password encryption.
     */
    static async encode(imageData: ImageData, message: string, password?: string): Promise<ImageData> {
        let payload = message;

        if (password && password.length > 0) {
            payload = await this.encrypt(message, password);
        }

        const binaryMessage = this.textToBinary(payload);
        const data = imageData.data;

        if (binaryMessage.length > data.length / 4) {
            throw new Error('Message too long for this image.');
        }

        let bitIndex = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (bitIndex >= binaryMessage.length) break;

            const bit = parseInt(binaryMessage[bitIndex]);
            data[i] = (data[i] & 254) | bit;

            bitIndex++;
        }

        return imageData;
    }

    /**
     * Decodes a LSB string from an image. 
     * If encrypted, returns the "ENC:..." string. 
     * Consumer must check for "ENC:" prefix and call decrypt() if needed.
     */
    static decode(imageData: ImageData): string {
        const data = imageData.data;
        let binaryMessage = '';

        // Revised Loop: Stop at null terminator
        let currentByte = '';

        for (let i = 0; i < data.length; i += 4) {
            const bit = (data[i] & 1).toString();
            binaryMessage += bit;
            currentByte += bit;

            if (currentByte.length === 8) {
                if (currentByte === '00000000') {
                    break; // End of message
                }
                currentByte = '';
            }
        }

        return this.binaryToText(binaryMessage);
    }
}
