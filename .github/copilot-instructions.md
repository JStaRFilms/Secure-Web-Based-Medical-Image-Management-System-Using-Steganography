# Github Copilot Instructions

## Technical preferences
- **Framework:** Next.js (App Router).
- **Style:** Tailwind CSS. Use `clsx` and `tailwind-merge` for class manipulation.
- **Language:** TypeScript.

## Rules
1. **Server First:** All components are React Server Components (RSC) unless `useState` or `useEffect` is needed.
2. **Client Boundaries:** Use `'use client'` at the top of files that need browser APIs.
3. **Validation:** Use Zod for all form and API validation.
4. **Steganography:**
   - LSB Algorithm.
   - Handle binary data carefully.
   - Use Web Workers for heavy processing if needed.
5. **UI/UX:**
   - Follow the "Medical/Cyber" aesthetic.
   - Blue/Cyan/Zinc color palette.
