# Secure Web-Based Medical Image Management System Using Steganography

A Next.js medical image management prototype for hiding and recovering sensitive patient notes inside image files with steganography. It includes email/password authentication, protected dashboard routes, an encryption lab, a decryption lab, and SQLite-backed audit logging.

## What the project does

- **Encrypt / embed messages:** Upload an image, enter a message, optionally add a password, and download the generated steganographic PNG.
- **Decrypt / extract messages:** Upload a generated image and recover the hidden message.
- **Authentication:** Better Auth email/password sign-up and sign-in.
- **Audit logs:** Prisma records encryption/decryption activity in a local SQLite database.
- **Easy local install:** No hosted database is required. The app uses SQLite by default.

## Tech stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript + React 19
- **Styling:** Tailwind CSS v4
- **Authentication:** Better Auth
- **Database:** SQLite with Prisma ORM
- **Image/steganography:** Browser-side canvas processing plus project steganography utilities
- **Package manager:** pnpm

## Requirements

Install these first:

- **Node.js 20+** recommended
- **pnpm**

If pnpm is not installed:

```bash
npm install -g pnpm
```

## Quick start

```bash
git clone https://github.com/JStaRFilms/Secure-Web-Based-Medical-Image-Management-System-Using-Steganography.git
cd Secure-Web-Based-Medical-Image-Management-System-Using-Steganography
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

Open the app at <http://localhost:3000>.

Create a user from the **Sign Up** page, then sign in and use the dashboard.

## Environment setup

The project includes `.env.example`. Copy it to `.env` before running the app:

```bash
cp .env.example .env
```

Default local values:

```env
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

For a real handoff/demo, replace `BETTER_AUTH_SECRET` with a strong random value:

```bash
openssl rand -base64 32
```

> The SQLite file is created at `prisma/dev.db` because Prisma resolves `file:./dev.db` relative to the `prisma/schema.prisma` file.

## Database setup

This project already uses **SQLite**, so no external database service is needed.

Run migrations after installing dependencies and creating `.env`:

```bash
pnpm db:migrate
```

Useful database commands:

```bash
pnpm db:generate   # regenerate Prisma Client
pnpm db:migrate    # create/update local SQLite database using migrations
pnpm db:deploy     # apply migrations in deployment/CI environments
pnpm db:push       # push schema directly without migration history, useful for quick prototypes
pnpm db:studio     # open Prisma Studio to inspect data
```

## Run commands

```bash
pnpm dev       # start development server
pnpm build     # production build check
pnpm start     # run production build locally after pnpm build
pnpm lint      # run ESLint
pnpm setup     # install dependencies, generate Prisma Client, and run migrations
```

## Project structure

```text
src/
├── app/
│   ├── (app)/              # Protected dashboard, labs, settings, audit logs
│   ├── (auth)/             # Sign in and sign up pages
│   ├── api/auth/[...all]/  # Better Auth API route
│   └── actions/            # Server actions for audit data
├── components/             # Shared UI components
├── hooks/                  # Client hooks
└── lib/                    # Auth, Prisma, DICOM, steganography, utilities

prisma/
├── schema.prisma           # SQLite datasource and models
└── migrations/             # Database migration history

docs/                       # Project requirements, mockups, handoff notes, paper assets
```

## Handoff installation checklist

Before submitting the project, confirm the recipient can do the following from a clean clone:

1. Install Node.js 20+ and pnpm.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env`.
4. Replace `BETTER_AUTH_SECRET` in `.env` with a strong random secret.
5. Run `pnpm db:migrate` to create `prisma/dev.db`.
6. Run `pnpm dev`.
7. Visit <http://localhost:3000>, sign up, sign in, and test the encryption/decryption labs.

## Notes for deployment

- SQLite is excellent for easy local installation and single-instance demos.
- If deploying publicly, make sure the host provides persistent storage for the SQLite database file, or move to a managed database later.
- Always set a unique `BETTER_AUTH_SECRET` in production.
- Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to the deployed site URL.

## Security note

This is a steganography prototype for academic/demo use. Steganography hides data inside an image, but it should not be treated as a full replacement for strong cryptography, secure key management, HTTPS, access controls, and compliance review in real medical environments.
