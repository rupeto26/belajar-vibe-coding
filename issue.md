# Project Setup: Bun + ElysiaJS + Drizzle + MySQL

## Objective

Setup project backend API baru menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai web framework, **Drizzle ORM** untuk database layer, dan **MySQL** sebagai database.

---

## Phase 1: Project Initialization

- Inisialisasi project Bun baru di folder ini (`bun init`)
- Setup `tsconfig.json` dengan konfigurasi yang sesuai untuk Bun
- Setup struktur folder project:
  ```
  src/
  ├── index.ts          # Entry point aplikasi
  ├── db/
  │   ├── index.ts      # Database connection
  │   └── schema.ts     # Drizzle schema definitions
  ├── routes/
  │   └── index.ts      # Route definitions
  └── config/
      └── index.ts      # Environment & app config
  drizzle.config.ts     # Drizzle Kit config
  .env                  # Environment variables
  ```

## Phase 2: Install Dependencies

- Install runtime dependencies:
  - `elysia` — web framework
  - `drizzle-orm` — ORM
  - `mysql2` — MySQL driver
- Install dev dependencies:
  - `drizzle-kit` — migration tool & schema management
  - `@types/bun` — Bun type definitions

## Phase 3: Database Setup

- Buat file `.env` dengan konfigurasi koneksi MySQL (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Setup koneksi database menggunakan `mysql2` + `drizzle-orm`
- Buat contoh schema sederhana (misal: tabel `users` dengan kolom `id`, `name`, `email`, `created_at`)
- Setup `drizzle.config.ts` untuk Drizzle Kit
- Generate dan jalankan migration awal

## Phase 4: API Setup

- Setup ElysiaJS server di `src/index.ts` dengan port dari environment variable
- Buat contoh CRUD routes untuk tabel `users`:
  - `GET /users` — list semua users
  - `GET /users/:id` — get user by id
  - `POST /users` — create user baru
  - `PUT /users/:id` — update user
  - `DELETE /users/:id` — delete user
- Tambahkan basic error handling

## Phase 5: Scripts & Finishing

- Tambahkan scripts di `package.json`:
  - `dev` — jalankan server dalam mode development
  - `db:generate` — generate migration dari schema
  - `db:migrate` — jalankan migration
  - `db:studio` — buka Drizzle Studio
- Buat file `.env.example` sebagai template
- Update `.gitignore` (tambahkan `node_modules`, `.env`, dll)

---

## Notes

- Pastikan MySQL server sudah berjalan sebelum menjalankan migration
- Gunakan `bun run dev` untuk menjalankan server
- Gunakan Drizzle Kit untuk mengelola schema dan migration
