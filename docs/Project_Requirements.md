# Project Requirements: BigSam_Steganography

## Project Overview
**Title:** Secure Web-Based Medical Image Management System Using Steganography
**Mission:** Create a "Senior Developer" grade medical application that allows medical professionals to securely hide sensitive patient diagnoses within medical images (X-Rays/Scans) using steganography.
**Vibe:** Sterile, High-Security, Professional, "Complex" (Audited).
**Tech Stack:** Next.js (App Router), Tailwind CSS, TypeScript, Prisma (SQLite/Neon), Client-Side Steganography.

## Functional Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | Medical Professional Authentication | As a Doctor, I want to securely log in, so that I can access the encryption tools. | User is authenticated via Clerk; redirects to Dashboard. | MUS |
| FR-002 | Patient Data Encoding (Encryption) | As a Doctor, I want to upload an X-Ray and type a diagnosis, so that it is properly hidden in the image pixels. | System uses LSB algorithm (Client-side) to embed text into image; outputs downloadable PNG. | MUS |
| FR-003 | Patient Data Decoding (Decryption) | As a Receiver, I want to upload a secured X-Ray and enter a key, so that I can read the hidden diagnosis. | System extracts text from image pixels; displays diagnosis if key matches (simulated or real). | MUS |
| FR-004 | Secure Dashboard UI | As a User, I want a professional "Medical/Cyber" dashboard, so that I feel the system is secure and distinct from basic apps. | sterile blue/white/dark aesthetic; reliable navigation; "Security Status" indicators. | MUS |
| FR-005 | Image Integrity Check | As a Doctor, I want to ensure the image looks visually identical, so that the steganography is successful. | Visual comparison (Before/After); "Encryption Successful" notification. | MUS |
| FR-006 | Audit Logs (History) | As an Admin, I want to see a log of encoded images, so that I can track usage. | Database table `EncryptionEvents` tracks UserID, Timestamp, and Operation Type. | MUS |
| FR-007 | Cloud Storage | As a Doctor, I want to save images to the cloud, so that I can access them anywhere. | Storage bucket integration (Supabase/AWS S3). | Future |
