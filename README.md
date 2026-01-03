# BigSam Steganography 🔒

> **Secure. Sterile. Steganographic.**
> A "Senior Developer" grade medical image management system for securely embedding sensitive patient diagnoses within medical imaging data.

![Project Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_Tailwind_|_Prisma-blue)
![Security](https://img.shields.io/badge/Security-Client--Side_LSB-red)

## 🏥 Mission

To provide medical professionals with a highly secure, web-based tool for hiding patient data inside X-Rays and scans using **Least Significant Bit (LSB)** steganography. This system ensures that sensitive information travels invisibly with the image itself, protected by an additional layer of access control and encryption logic.

**Vibe:** Professional, High-Security, Clinical.

---

## ⚡ Tech Stack

Built on the **VibeCode Protocol** for speed, reliability, and aesthetic excellence.

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Language:** TypeScript (Strict Mode)
-   **Auth:** [Better Auth](https://better-auth.com/) (Self-Hosted, Secure)
-   **Database:** Prisma ORM (SQLite for Dev, Neon for Prod)
-   **Steganography:** Custom Client-Side LSB Algorithm (`daikon` for DICOM support)
-   **Validation:** Zod schemas for all inputs

---

## 🛠 Features

### 1. Medical Authentication Node
Secure entry point for authorized personnel.
-   **Self-Hosted Auth:** Full control over user sessions.
-   **Role-Based Access:** Distinction between Doctors (Encoders) and Admin/Auditors.

### 2. Encryption Lab (The Encoder)
The core workspace for embedding data.
-   **LSB Algorithm:** Hides text data in the least significant bits of image pixels.
-   **Client-Side Processing:** Images are processed in the browser; raw patient data never leaves the client in plain text during the encoding phase.
-   **DICOM Support:** Native handling of medical imaging formats.
-   **Visual Integrity:** "Before & After" comparison to ensure the image remains visually identical to the naked eye.

### 3. Decryption Lab (The Decoder)
The extraction interface for authorized receivers.
-   **Secure Extraction:** rapid decoding of hidden messages from steganographic images.
-   **Key Verification:** (Planned) Optional private key requirement for unlocking messages.

### 4. Audit & Compliance
-   **Encryption Events:** Tracks who encrypted what and when.
-   **Immutable Logs:** Database records for all steganography operations to ensure accountability.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   pnpm (Preferred)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/bigsam-steganography.git
    cd bigsam-steganography
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Setup Environment:**
    Copy `.env.example` to `.env` and configure your database/auth keys.

4.  **Initialize Database:**
    ```bash
    pnpm dlx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React Components (UI & Features)
│   ├── features/           # Domain-specific logic (VibeCode Pattern)
│   ├── lib/                # Utilities (Steganography logic, DB)
│   └── secure-system/      # Core security modules
├── docs/                   # Documentation & Requirements
└── prisma/                 # Database Schema
```

---

## 🛡️ Security Note

This tool uses **Least Significant Bit (LSB)** steganography. While effective for visual obfuscation, it is not a replacement for strong encryption (AES-256). For maximum security, this system is designed to layer steganography *on top* of encrypted messages in future updates.

---

*Built with precision.*
