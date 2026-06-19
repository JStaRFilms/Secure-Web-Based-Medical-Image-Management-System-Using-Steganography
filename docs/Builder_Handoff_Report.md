# Builder Handoff Report

**Generated:** 2026-01-02  
**Updated:** 2026-06-19

## What Was Built

- **Medical professional authentication:** Better Auth email/password sign-up and sign-in.
- **Protected app routes:** Dashboard, encryption lab, decryption lab, settings, and audit logs are protected by middleware.
- **Patient data encoding:** Browser-side image processing embeds text payloads into uploaded images.
- **Patient data decoding:** Decryption lab extracts hidden messages from generated steganographic PNGs.
- **Optional password protection:** Encryption/decryption flows support password-based payload protection.
- **Dashboard UI:** Clinical/cyber dashboard with navigation, activity summaries, and lab entry points.
- **Audit logs:** Prisma records encryption/decryption activity in SQLite.
- **Easy local database:** The project uses SQLite by default; no hosted database is required for installation.

## Current Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS v4
- Better Auth
- Prisma ORM
- SQLite (`DATABASE_URL="file:./dev.db"`)
- pnpm

## Important Setup Files

- `.env.example` — safe environment template to copy into `.env`
- `package.json` — scripts for app, lint, and database setup
- `prisma/schema.prisma` — SQLite datasource and data models
- `prisma/migrations/` — migration history used to create the local database
- `README.md` — recipient-facing installation and handoff instructions

## Clean Install Process

### Windows Command Prompt

```bat
git clone https://github.com/JStaRFilms/Secure-Web-Based-Medical-Image-Management-System-Using-Steganography.git
cd Secure-Web-Based-Medical-Image-Management-System-Using-Steganography
pnpm install
copy .env.example .env
pnpm db:migrate
pnpm dev
```

### macOS, Linux, Git Bash, or PowerShell

```bash
git clone https://github.com/JStaRFilms/Secure-Web-Based-Medical-Image-Management-System-Using-Steganography.git
cd Secure-Web-Based-Medical-Image-Management-System-Using-Steganography
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

If pnpm shows `[ERR_PNPM_IGNORED_BUILDS]`, run `pnpm approve-builds`, approve the listed Prisma/Next native packages, then run `pnpm install` again.

Open <http://localhost:3000>, create an account on the Sign Up page, then sign in.

## Database Notes

The app is already configured for SQLite:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Default `.env` value:

```env
DATABASE_URL="file:./dev.db"
```

Prisma creates the local database at `prisma/dev.db` when `pnpm db:migrate` runs. The database file is intentionally ignored by git so each installer gets a clean local database.

## Useful Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production server after build
pnpm lint         # Run ESLint
pnpm db:generate  # Generate Prisma Client
pnpm db:migrate   # Run local migrations and create/update SQLite DB
pnpm db:deploy    # Apply migrations in deployment/CI environments
pnpm db:studio    # Open Prisma Studio
pnpm setup        # Install dependencies, generate Prisma Client, run migrations
```

## Handoff Checklist

- [ ] Recipient has Node.js 20+ installed.
- [ ] Recipient has pnpm installed.
- [ ] `.env.example` exists in the repository.
- [ ] Recipient copied `.env.example` to `.env`.
- [ ] `BETTER_AUTH_SECRET` was changed to a strong random secret.
- [ ] `pnpm db:migrate` creates `prisma/dev.db` successfully.
- [ ] `pnpm dev` starts the site successfully.
- [ ] Recipient can sign up and sign in.
- [ ] Recipient can test the encryption lab and decryption lab.

## Future Improvements

- Add automated tests for steganography encode/decode flows.
- Add AES encryption before steganographic embedding for stronger payload security.
- Add cloud storage only if the deployment requirements need saved encrypted files.
- Add a production database option only if the project outgrows single-instance SQLite.
