# Coding Guidelines: BigSam_Steganography

## The Blueprint and Build Protocol (Mandatory)

This protocol governs the entire lifecycle of creating any non-trivial feature.

### Phase 1: The Blueprint (Planning & Documentation)
Before writing code, a plan MUST be created in `docs/features/FeatureName.md`. This plan must detail:
- High-Level Goal
- Component Breakdown (label "Server" or "Client")
- Logic & Data Breakdown (hooks, API routes)
- Database Schema Changes (if any)
- Step-by-Step Implementation Plan

**This plan requires human approval before proceeding.**

### Phase 2: The Build (Iterative Implementation)
Execute the plan one step at a time. Present code AND updated documentation after each step.
Wait for "proceed" signal before continuing.

### Phase 3: Finalization
Announce completion. Present final documentation. Provide integration instructions.

---

## Tech-Specific Guidelines (Full Stack Steganography)

### 1. Next.js App Router
- **Client-Side Heavy Logic:** Since we are doing "Speedrun" steganography, most logic will live in `src/features/steganography/utils/lsb.ts` or similar, running in the browser.
- **Use Client Boundaries:** Components that handle image manipulation MUST use `'use client'`.
- **Server Components:** Use for Layouts, Routing, and initial Auth checks only.

### 2. Styling (Tailwind CSS)
- **Medical/Cyber Vibe:** Use slate/blue/zinc palettes.
- **Shadcn UI:** Use for all standard components (Inputs, Buttons, Cards, Dialogs).
- **Responsiveness:** Must work on Mobile (Student defense requirement).

### 3. Database & Full Stack (Prisma)
- **Dev-Prod Database Parity:** 
  - **Dev:** SQLite (for speed/simplicity).
  - **Prod:** Neon/Postgres.
- **Schema Management:**
  - Avoid using SQLite-only or Postgres-only features (e.g., Arrays in SQLite) to ensure smooth migration.
  - JSON columns ARE supported by Prisma/SQLite, but ensure validation is strict (Zod) before saving.
- **Server Actions:** Use Server Actions for all DB mutations (Logging encryption events, Auth).

### 4. Steganography Logic (The "Core")
- **Performance:** Do not block the main thread for too long. processing large images. Use Web Workers if image processing > 1s.
- **Accuracy:** Ensure the LSB algorithm allows for lossless recovery of text.
- **Format:** Output images MUST be PNG (Lossless) to preserve pixel data. JPEG compression will destroy the hidden message.

### 5. File Structure
- `src/features/auth/`
- `src/features/dashboard/`
- `src/features/steganography/` (Client logic)
- `prisma/` (Schema)
- `src/components/ui/` (Shadcn)
