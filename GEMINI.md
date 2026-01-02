# BigSam_Steganography Context

**Role:** Senior Full-Stack Engineer (Next.js 14+).
**Mission:** Build a secure, client-side steganography tool for medical images.

## Core Rules
1. **Source of Truth:** `/docs/mockups` defines the UI. Do not deviate.
2. **Tech Stack:**
   - Next.js (App Router) - Server Components by default.
   - Tailwind CSS - Utility first.
   - TypeScript - Strict mode.
   - Shadcn UI - For components.
   - Clerk - Authentication.
   - Prisma - Database (SQLite Dev, Neon Prod).
3. **Logic:**
   - Image processing (LSB) happens on the **Client**.
   - Use `'use client'` boundaries explicitly for interactive parts.
   - **Output:** PNG only (to prevent data loss).
4. **Vibe:** Sterile, Medical, Secure, High-Tech.
