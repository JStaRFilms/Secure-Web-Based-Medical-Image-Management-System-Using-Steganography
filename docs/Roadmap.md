# Roadmap: BigSam_Steganography

## MUS (Minimum Usable State)

### FR-001: Project Scaffolding & Design System
- **Status:** Pending
- **Goal:** Initialize Next.js, setup Tailwind/Shadcn, establish the "Medical Cyber" layout.
- **Acceptance:** Home page loads, Layout is responsive, Theme is applied.

### FR-002: LSB Core Logic Implementation (The Engine)
- **Status:** Pending
- **Goal:** Write the pure TypeScript functions to LSB-encode text into an ImageData object and decode it back.
- **Acceptance:** Unit tests (or manual verification) show Message In -> Image -> Message Out.

### FR-003: Encryption Dashboard (UI)
- **Status:** Pending
- **Goal:** Interface for Doctors. Upload Image -> Type Text -> "Encrypting..." Animation -> Download PNG.
- **Acceptance:** User can successfully create a stego-image.

### FR-004: Decryption Dashboard (UI)
- **Status:** Pending
- **Goal:** Interface for Receivers. Upload PNG -> Type Key -> "Decrypting..." Animation -> Show Text.
- **Acceptance:** User can successfully read secret text from a valid stego-image.

## Future Scope

- **FR-006:** Audit Logs (User History)
- **FR-007:** Cloud Persistence
