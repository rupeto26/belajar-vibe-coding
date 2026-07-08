# SIMDO - Dokumentasi Gabungan (Versi Disempurnakan oleh Claude)

File ini adalah hasil gabungan seluruh dokumen SIMDO-Batch-1.1 s/d 7.3 dan seluruh MD ADDON, dengan sejumlah perbaikan agar lebih siap dipakai sebagai acuan Claude Code.

## Perubahan dari versi sebelumnya (SIMDO_MASTER_SETELAH_ADDON.md)

1. `20_CLAUDE.md` dipindah ke posisi paling awal dan diganti nama menjadi `00_ATURAN_UNTUK_CLAUDE_CODE` — karena isinya aturan wajib, bukan lampiran akhir.
2. Penomoran dokumen addon disatukan ke satu pola (`06.3`, `06.4`, `06.5`, `12.1`, `13.1`) — sebelumnya campur antara gaya "Part N" dan akhiran huruf "A".
3. **Pimpinan dipastikan bukan role sistem** — hanya penerima dokumen di luar aplikasi, tanpa akun/login. Sistem tetap hanya punya 2 role: Administrator dan Operator.
4. Ditambahkan catatan keamanan untuk **Formula Engine** — larangan eval()/evaluasi dinamis, wajib pakai parser whitelist.
5. Ditambahkan catatan keamanan **upload Template DOCX** — batas ukuran, larangan macro, mitigasi zip-slip, saran antivirus scan.
6. Ditambahkan rancangan **tabel database untuk modul addon** (Template Analyzer, Style Engine, Workflow Engine, History Engine, Dashboard) yang sebelumnya belum punya skema.
7. Diperjelas beberapa kriteria yang tadinya kabur (mis. "data normal", "dokumen normal") dengan angka konkret — masih berupa asumsi awal, sesuaikan jika perlu.
8. Ditambahkan bagian **Catatan Implementasi untuk Claude** pada dokumen inti yang sebelumnya tidak punya (Vision, Scope, Architecture Part 2, Master Data Part 2).

Total sumber: SIMDO-Batch-1.1 s/d SIMDO-Batch-7.3, ditambah SIMDO-Addon-01 s/d SIMDO-Addon-05.

---

## [00_ATURAN_CLAUDE] 00_ATURAN_UNTUK_CLAUDE_CODE.md

# 00_ATURAN_UNTUK_CLAUDE_CODE

> Catatan: dokumen ini sebelumnya bernama `20_CLAUDE.md`. Nomor 20 membuatnya terkesan lampiran di akhir, padahal isinya adalah aturan wajib yang harus dibaca PALING AWAL oleh Claude Code sebelum menyentuh kode apa pun. Karena itu dipindah ke posisi pertama dan diberi nama `00_ATURAN_UNTUK_CLAUDE_CODE`.


# Purpose

Dokumen ini berisi aturan implementasi yang WAJIB diikuti oleh Claude Code selama pengembangan SIMDO.

---

# Identity

Claude bertindak sebagai:

- Senior Laravel Engineer
- Software Architect
- Database Designer
- Code Reviewer

Claude tidak bertindak sebagai pembuat prototype cepat.

Target utama adalah aplikasi yang mudah dikembangkan, mudah dipelihara, dan mengikuti praktik terbaik Laravel.

---

# Project Identity

Nama Proyek:
SIMDO (Sistem Manajemen Dokumen)

Filosofi:
Dynamic Document Engine.

SIMDO bukan generator Surat Tugas.
SIMDO adalah engine yang dapat menghasilkan berbagai jenis dokumen menggunakan Template DOCX.

---

# Technology Stack

- Laravel 12
- PHP 8.3
- Bootstrap 5
- Blade
- MySQL
- PHPWord
- DomPDF
- Carbon

---

# Architecture Rules

Gunakan pola:

Controller
↓
Service
↓
Repository
↓
Model

Controller hanya menerima request dan mengembalikan response.

Business Logic hanya berada di Service.

Repository hanya menangani query database.

Model hanya berisi relasi dan atribut.

---

# Database Rules

- Gunakan migration.
- Gunakan foreign key.
- Gunakan soft delete jika diperlukan.
- Hindari query duplikat.
- Nama tabel snake_case.

---

# UI Rules

- Bootstrap 5.
- Responsive.
- Konsisten.
- Tidak menggunakan Tailwind.
- Tidak menggunakan Livewire.

---

# Document Rules

Generator TIDAK membuat layout.

Generator:

1. Membuka template DOCX.
2. Mengganti placeholder.
3. Menyimpan DOCX.
4. Menghasilkan PDF.

Semua style berasal dari template.

---

# Master Data Rules

Semua pilihan berasal dari master data.

Contoh:

Pegawai
Kanwil
Kantah
Wilayah

Tidak boleh hardcode.

---

# Template Studio Rules

Template mempunyai status:

Draft
Published
Archived

Generator hanya menggunakan template Published.

---

# Coding Rules

- Clean Code
- SOLID
- DRY
- KISS
- FormRequest untuk validasi.
- Service untuk business logic.
- Repository untuk query.

---

# Forbidden

Claude tidak boleh:

- Hardcode jenis surat.
- Hardcode placeholder.
- Query di Controller.
- Mengubah layout DOCX.
- Membuat satu halaman khusus untuk setiap jenis surat.

---

# Acceptance Criteria

Implementasi dianggap benar apabila:

- Template baru dapat digunakan tanpa mengubah source code.
- Dynamic Form terbentuk otomatis.
- DOCX identik dengan template.
- PDF berasal dari DOCX.
- Arsitektur tetap modular.

---

## [SIMDO-Batch-1.1] 01_PROJECT_VISION.md

# 01 PROJECT VISION

# 1. Latar Belakang

Saat ini setiap jenis surat biasanya dibuat dengan kode yang berbeda.
Akibatnya setiap ada Surat Tugas baru, Nota Dinas baru, atau Berita Acara baru, programmer harus mengubah source code.

SIMDO menghilangkan pendekatan tersebut.

Aplikasi tidak mengenal jenis surat.

Aplikasi hanya mengenal Template.

# 2. Visi

Membangun sebuah Dynamic Document Engine yang mampu menghasilkan berbagai dokumen dinas menggunakan template DOCX tanpa mengubah source code.

# 3. Misi

- Seluruh dokumen berasal dari Template Studio.
- Seluruh data berasal dari Master Data.
- Seluruh form dibangun otomatis dari metadata template.
- Word mengikuti template 100%.
- PDF berasal dari hasil Word.

# 4. Permasalahan Saat Ini

- Banyak hardcode.
- Sulit menambah jenis surat.
- Format sering berubah.
- Font dan margin sering berbeda.
- Maintenance mahal.

# 5. Solusi

Menggunakan Template Studio.

Admin cukup mengunggah template DOCX kemudian melakukan mapping placeholder.

Generator membaca metadata dan membangun form secara otomatis.

# 6. Prinsip Desain

1. Template Driven.
2. Metadata Driven.
3. Tidak ada hardcode jenis surat.
4. Generator hanya mengganti placeholder.
5. Style selalu mengikuti template.

# 7. Ruang Lingkup Batch Berikutnya

- ERD
- Master Data
- Template Studio
- Placeholder Engine
- Document Engine
- Dynamic Form
- Word Engine
- PDF Engine

---

# Catatan Implementasi untuk Claude

Dokumen ini adalah visi, bukan spesifikasi teknis. Jangan mulai coding dari sini — tunggu sampai 03_ARCHITECTURE dan 04_DATABASE selesai dibaca.

---

## [SIMDO-Batch-1.2] 01_PROJECT_VISION.md

# 01_PROJECT_VISION (Part 2)

# Purpose

Menjelaskan tujuan bisnis, ruang lingkup, stakeholder, indikator keberhasilan, dan alur bisnis SIMDO.

---

# Business Goals

SIMDO dibangun untuk mengubah proses pembuatan dokumen dari **code-driven** menjadi **template-driven**.

Target utama:

- Penambahan jenis dokumen tidak memerlukan perubahan source code.
- Administrator dapat menambahkan template baru secara mandiri.
- Dokumen Word dan PDF memiliki format identik dengan template resmi.
- Seluruh data menggunakan master data sehingga tidak terjadi duplikasi.

---

# Stakeholder

## Administrator
Mengelola seluruh master data, template, placeholder, dan konfigurasi.

## Operator
Membuat dokumen berdasarkan template yang tersedia.

## Pimpinan
Menerima dokumen hasil generate di luar sistem (fisik/email). Pimpinan bukan pengguna sistem — tidak memiliki akun, login, atau role di SIMDO (lihat keputusan di 17_SECURITY).

## Tim Pengembang
Mengembangkan engine aplikasi tanpa membuat halaman baru untuk setiap jenis dokumen.

---

# In Scope

Versi 1.0 meliputi:

- Login Admin
- Dashboard
- Master Pegawai
- Master Kanwil
- Master Kantah
- Master Wilayah
- Template Studio
- Placeholder Engine
- Dynamic Form Engine
- Formula Engine
- Generator DOCX
- Generator PDF
- Riwayat Dokumen

---

# Out of Scope

Belum termasuk:

- Digital Signature
- OCR
- AI Document Classification
- Integrasi e-Office
- Integrasi SSO
- Workflow Persetujuan

---

# Success Criteria

Aplikasi dianggap berhasil apabila:

1. Jenis dokumen baru dapat dibuat hanya dengan menambah template.
2. Tidak ada perubahan kode ketika menambah template baru.
3. Seluruh placeholder dapat dirender otomatis.
4. Output DOCX identik dengan template.
5. PDF berasal dari DOCX yang telah selesai digenerate.

---

# Business Flow

1. Administrator mengunggah template DOCX.
2. Administrator melakukan mapping placeholder.
3. Template dipublikasikan.
4. Operator memilih template.
5. Dynamic Form dibangun otomatis.
6. Operator mengisi data.
7. Document Engine menghasilkan DOCX.
8. Sistem mengubah DOCX menjadi PDF.
9. Riwayat dokumen disimpan.

---

# Design Principles

- Template First
- Metadata Driven
- Reusable Components
- Modular
- Maintainable
- Extensible

---

# Acceptance Criteria

- Tidak ada hardcode jenis surat.
- Semua template dapat menggunakan engine yang sama.
- Master data dapat digunakan ulang oleh semua template.
- Placeholder menjadi sumber pembentukan form.

---

# Catatan Implementasi untuk Claude

Perhatikan In Scope vs Out of Scope: jangan implementasikan Digital Signature, OCR, AI Classification, integrasi e-Office/SSO, atau Workflow Persetujuan penuh pada versi 1.0, meski istilah-istilah itu muncul di dokumen addon (Workflow Engine) sebagai opsi masa depan.

---

## [SIMDO-Batch-1.3] 02_PROJECT_SCOPE.md

# 02_PROJECT_SCOPE

# Purpose

Menjelaskan ruang lingkup implementasi SIMDO versi 1.0 sehingga seluruh pengembangan memiliki batas yang jelas.

---

# Functional Scope

## Authentication

- Login
- Logout
- Session Management

## Dashboard

- Statistik dokumen
- Statistik template
- Statistik pengguna
- Aktivitas terbaru

## Master Data

- Pegawai
- Kanwil
- Kantah
- Provinsi
- Kabupaten/Kota
- Kecamatan
- Kelurahan

Semua master harus mendukung:
- CRUD
- Pencarian
- Pagination
- Soft Delete
- Restore

---

## Template Studio

Harus mendukung:

- Upload DOCX
- Edit metadata template
- Publish
- Archive
- Versioning
- Placeholder Mapping
- Preview template

---

## Placeholder Engine

Jenis placeholder minimal:

- Text
- Textarea
- Number
- Date
- Dropdown
- Repeatable
- Formula

Placeholder dapat mengambil datasource dari master data.

---

## Dynamic Form Engine

Form dibangun otomatis berdasarkan metadata template.

Tidak boleh ada form yang dibuat manual untuk setiap jenis dokumen.

---

## Document Engine

Harus mampu:

- Membaca template DOCX
- Mengganti placeholder
- Menghasilkan DOCX
- Menyimpan histori

---

## PDF Engine

Mengubah hasil DOCX menjadi PDF tanpa mengubah isi dokumen.

---

## History

Simpan:

- Template
- User
- Tanggal
- Nomor Dokumen
- File DOCX
- File PDF

---

# Non Functional Scope

## Performance

- Respon CRUD < 2 detik
- Generate dokumen normal < 5 detik (didefinisikan sebagai: dokumen maksimal 20 halaman dan maksimal 5 repeat block)

## Security

- Authentication
- Authorization
- CSRF Protection
- Validation seluruh input

## Maintainability

- Clean Architecture
- Modular
- Reusable

## Compatibility

- Chrome
- Edge

---

# User Roles

## Administrator

Mengelola seluruh sistem.

## Operator

Menghasilkan dokumen menggunakan template.

Role lain belum termasuk versi 1.0.

---

# Project Limitation

Versi pertama belum mencakup:

- AI Document Analysis
- OCR
- Digital Signature
- Workflow Approval
- Integrasi e-Office
- REST API Publik

---

# Future Scope

- Multi Instansi
- Multi Tenant
- QR Code
- Barcode
- Approval Workflow
- Audit Trail Lengkap
- API Integration
- AI Assisted Placeholder Detection

---

# Acceptance Criteria

1. Penambahan template tidak memerlukan perubahan source code.
2. Semua jenis dokumen menggunakan engine yang sama.
3. Seluruh input berasal dari metadata template.
4. Master data dapat digunakan ulang.
5. Output DOCX identik dengan template.

---

# Catatan Implementasi untuk Claude

Gunakan dokumen ini sebagai checklist definisi selesai (definition of done) per modul. Jangan menambah fitur di luar Functional Scope tanpa konfirmasi eksplisit dari pemilik project.

---

## [SIMDO-Batch-2.1] 03_ARCHITECTURE.md

# 03_ARCHITECTURE

# Purpose

Menjelaskan arsitektur logis SIMDO agar implementasi konsisten.

---

# High Level Architecture

Master Data
    ↓
Template Studio
    ↓
Placeholder Engine
    ↓
Dynamic Form Engine
    ↓
Document Engine
    ↓
Word Engine
    ↓
PDF Engine
    ↓
History

---

# Layer Architecture

Presentation Layer
- Blade
- Bootstrap
- Form
- Dashboard

↓

Application Layer
- Controller
- Form Request
- Service

↓

Domain Layer
- Template Studio
- Placeholder Engine
- Formula Engine
- Dynamic Form Engine
- Document Engine
- Word Engine
- Pdf Engine

↓

Infrastructure Layer
- Repository
- MySQL
- Storage
- PHPWord
- DomPDF

---

# Modul

## Authentication
Mengelola login administrator.

## Dashboard
Statistik dan aktivitas.

## Master Data
Sumber seluruh data referensi.

## Template Studio
Mengelola lifecycle template.

## Placeholder Engine
Menyimpan metadata placeholder.

## Dynamic Form Engine
Merender form berdasarkan metadata.

## Document Engine
Menghasilkan dokumen.

## History
Menyimpan riwayat generate.

---

# Dependency Rules

Document Engine bergantung pada:
- Template Studio
- Placeholder Engine
- Formula Engine

Word Engine bergantung pada:
- Document Engine
- PHPWord

PDF Engine bergantung pada:
- Word Engine

---

# Business Rules

- Tidak ada modul yang langsung membaca template selain Template Studio.
- Controller tidak boleh mengakses Repository secara langsung.
- Dynamic Form tidak boleh dibuat manual.
- Seluruh output harus melalui Document Engine.

---

# Acceptance Criteria

- Arsitektur modular.
- Low coupling.
- High cohesion.
- Mudah menambah modul baru tanpa mengubah modul lama.

---

## [SIMDO-Batch-2.2] 03_ARCHITECTURE.md

# 03_ARCHITECTURE (Part 2)

# Purpose

Mendefinisikan seluruh entity utama yang akan digunakan oleh SIMDO sebelum merancang database fisik.

---

# Design Principle

Entity mewakili konsep bisnis, bukan tabel database.

Database hanyalah implementasi dari entity.

---

# Core Entities

## Pegawai

Purpose:
Merepresentasikan ASN yang dapat ditugaskan dalam dokumen.

Attribute:
- NIP
- Nama
- Jabatan
- Status

Relationship:
Digunakan oleh Generated Document melalui Document Member.

---

## Template

Purpose:
Blueprint sebuah dokumen.

Memiliki:
- Nama
- Jenis
- Status
- Versi aktif

Relationship:
Template memiliki banyak Placeholder.

---

## Template Version

Purpose:
Menyimpan riwayat perubahan template.

Status:
- Draft
- Published
- Archived

Hanya satu versi Published.

---

## Placeholder

Purpose:
Representasi metadata pada template.

Jenis:

- Text
- Textarea
- Number
- Date
- Dropdown
- Repeatable
- Formula

Relationship:
Placeholder dapat memiliki Formula dan Datasource.

---

## Formula

Purpose:
Menghasilkan nilai otomatis.

Contoh:
- DATEDIFF
- TERBILANG
- CONCAT

---

## Generated Document

Purpose:
Representasi dokumen yang telah dibuat.

Menyimpan:
- Template
- Nomor Dokumen
- DOCX
- PDF
- Status

---

## Generated Document Detail

Purpose:
Menyimpan seluruh nilai placeholder yang digunakan ketika dokumen dibuat.

Keuntungan:
Dokumen dapat diregenerasi tanpa mengisi ulang form.

---

## Wilayah

Hierarchy:

Provinsi
↓
Kabupaten/Kota
↓
Kecamatan
↓
Kelurahan

---

## Kanwil

Mewakili Kantor Wilayah.

---

## Kantah

Berelasi dengan Kanwil.

---

# Dependency

Template
↓
Template Version
↓
Placeholder
↓
Formula
↓
Dynamic Form
↓
Generated Document
↓
Word Engine
↓
PDF Engine

---

# Entity Lifecycle

Template

Create
↓
Draft
↓
Mapping
↓
Validation
↓
Published
↓
Archived

Generated Document

Created
↓
Generated DOCX
↓
Generated PDF
↓
Stored History

---

# Business Rules

- Entity tidak mengetahui UI.
- Entity tidak mengetahui Controller.
- Entity tidak mengetahui Database Engine.
- Entity hanya merepresentasikan domain bisnis.

---

# Acceptance Criteria

- Seluruh entity memiliki tanggung jawab tunggal.
- Tidak ada entity yang saling tumpang tindih.
- Relasi entity mendukung penambahan jenis dokumen baru tanpa perubahan arsitektur.

---

# Catatan Implementasi untuk Claude

Entity di sini adalah rancangan konsep, bukan skema tabel final. Skema fisik mengikuti 04_DATABASE, termasuk tabel tambahan untuk modul addon yang ditambahkan belakangan.

---

## [SIMDO-Batch-2.3] 04_DATABASE.md

# 04_DATABASE

# Purpose

Dokumen ini mendefinisikan rancangan database SIMDO sebagai implementasi fisik dari Entity yang telah didefinisikan pada Architecture.

---

# Design Principles

- Database mengikuti Third Normal Form (3NF).
- Gunakan foreign key pada seluruh relasi.
- Hindari duplikasi data.
- Gunakan soft delete untuk master data yang memungkinkan diarsipkan.
- Semua tabel menggunakan kolom created_at dan updated_at.

---

# Naming Convention

## Table
snake_case

Contoh:
master_pegawai
master_kanwil
template_versions

## Primary Key

id (BIGINT UNSIGNED)

## Foreign Key

<nama_tabel>_id

Contoh:
template_id
pegawai_id
kanwil_id

---

# Core Tables

## master_pegawai

Purpose:
Menyimpan data pegawai.

Kolom:
- id
- nip (unique)
- nama
- jabatan
- status
- created_at
- updated_at
- deleted_at

Index:
- nip
- nama

---

## master_kanwil

Kolom:
- id
- kode
- nama

Index:
- kode

---

## master_kantah

Kolom:
- id
- kanwil_id
- kode
- nama

FK:
kanwil_id -> master_kanwil.id

---

## master_provinsi
- id
- kode
- nama

## master_kabupaten
- id
- provinsi_id
- kode
- nama

## master_kecamatan
- id
- kabupaten_id
- kode
- nama

## master_kelurahan
- id
- kecamatan_id
- kode
- nama

---

## templates

Kolom:
- id
- nama
- kategori
- deskripsi
- status

Status:
Draft
Published
Archived

---

## template_versions

Kolom:
- id
- template_id
- versi
- file_docx
- status_publish

Rule:
Hanya satu versi Published untuk setiap template.

---

## template_placeholders

Kolom:
- id
- template_version_id
- nama
- tipe
- datasource
- required
- repeatable

---

## template_formulas

Kolom:
- id
- placeholder_id
- formula
- parameter

---

## generated_documents

Kolom:
- id
- template_version_id
- nomor_dokumen
- file_docx
- file_pdf
- generated_by
- generated_at

---

## generated_document_details

Kolom:
- id
- generated_document_id
- placeholder
- value

Purpose:
Menyimpan seluruh nilai placeholder sehingga dokumen dapat diregenerasi.

---

# Relationship

master_kanwil
  └── master_kantah

master_provinsi
  └── master_kabupaten
        └── master_kecamatan
              └── master_kelurahan

templates
  └── template_versions
        └── template_placeholders
              └── template_formulas

template_versions
  └── generated_documents
        └── generated_document_details

---

# Database Rules

- Tidak boleh menyimpan data yang dapat dihitung ulang.
- Gunakan transaksi untuk proses generate dokumen.
- Seluruh foreign key wajib tervalidasi.
- Jangan melakukan hard delete terhadap master data.

---

# Acceptance Criteria

- Struktur mendukung penambahan jenis dokumen tanpa perubahan tabel.
- Seluruh master data dapat digunakan ulang.
- Template memiliki versioning.
- Riwayat generate dapat ditelusuri.

---

## [SIMDO-Batch-2.4] 04_DATABASE.md

# 04_DATABASE (Part 2)

## Purpose
Melengkapi rancangan database dengan standar implementasi.

## Constraint
- Seluruh foreign key wajib menggunakan constraint database.
- Tidak boleh orphan record.
- Gunakan transaction saat generate dokumen.
- Soft delete untuk master data dan template.

## Audit
Simpan:
- created_by
- updated_by
- created_at
- updated_at

## Index Recommendation
master_pegawai:
- nip (unique)
- nama

templates:
- nama
- kategori

generated_documents:
- nomor_dokumen
- generated_at

## Migration Rules
- Satu migration satu tabel.
- Ikuti konvensi Laravel.
- Seeder dipisahkan dari migration.

## Seeder
- Provinsi
- Kabupaten
- Kecamatan
- Kelurahan
- Kanwil
- Kantah

Seeder harus idempotent.

## Acceptance Criteria
- migrate:fresh --seed berhasil.
- Seluruh FK tervalidasi.

---

# Tabel Tambahan untuk Modul Addon (Tambahan)

Versi database sebelumnya (di atas) dirancang sebelum modul Template Analyzer, Style Engine, Workflow Engine, History Engine, dan Dashboard ditambahkan. Tabel berikut perlu dilengkapi agar seluruh modul addon punya tempat penyimpanan yang jelas:

## template_analysis_results
- id
- template_version_id (FK)
- placeholder_metadata (JSON)
- font_metadata (JSON)
- layout_metadata (JSON)
- validation_report (JSON)
- created_at

## template_style_metadata
- id
- template_version_id (FK)
- style_json (JSON — font, paragraph, table, header/footer, image rules)
- created_at

## workflow_transitions
- id
- entity_type (mis. "template", "generated_document")
- entity_id
- from_status
- to_status
- user_id (FK)
- note
- created_at

## generated_documents (kolom tambahan)
- hash_docx
- hash_pdf

## generated_document_snapshots
- id
- generated_document_id (FK)
- placeholder_snapshot (JSON)
- formula_snapshot (JSON)
- datasource_snapshot (JSON)
- created_at

## dashboard_statistic_cache
- id
- cache_key (unique)
- value_json (JSON)
- generated_at

Catatan: tabel-tabel ini boleh disesuaikan strukturnya oleh Claude Code selama tetap 3NF, menggunakan foreign key, dan mengikuti Naming Convention pada dokumen ini.

---

# Catatan Implementasi untuk Claude

- Buat migration terpisah untuk setiap tabel addon di atas, sesuai Migration Rules.
- Jangan gabungkan JSON metadata Template Analyzer/Style Engine ke tabel `templates` atau `template_versions` yang sudah ada — pisahkan agar tabel inti tetap ringkas.


---

## [SIMDO-Batch-2.4] 15_FOLDER_STRUCTURE.md

# 15_FOLDER_STRUCTURE

## Purpose
Menetapkan struktur proyek Laravel.

## Struktur

app/
- Http/
- Models/
- Services/
- Repositories/
- Helpers/
- Actions/
- Enums/
- Traits/

resources/
- views/
- css/
- js/

storage/app/
- templates/
- generated/

## Rules
- Controller hanya orchestration.
- Service untuk business logic.
- Repository untuk query.
- Model hanya Eloquent.
- Upload template disimpan di storage/app/templates.

## Namespace
- App\Services
- App\Repositories
- App\Helpers
- App\Actions

## Acceptance Criteria
- Struktur konsisten.
- Mudah dikembangkan.

---

## [SIMDO-Batch-3.1] 05_MASTER_DATA.md

# 05_MASTER_DATA

# Purpose

Master Data menjadi sumber referensi tunggal (Single Source of Truth) bagi seluruh Document Engine.

---

# Design Principles

- Tidak boleh ada input bebas apabila data berasal dari master.
- Semua master mendukung CRUD, pencarian, pagination, soft delete, dan restore.
- Seluruh dropdown pada Dynamic Form mengambil data dari master.

---

# MASTER PEGAWAI

## Tujuan
Menyimpan data pegawai yang dapat dipilih sebagai petugas pada dokumen.

## Atribut Minimum
- NIP (unik)
- Nama Lengkap
- Jabatan
- Unit Kerja
- Status Aktif

## Business Rules
- Pencarian berdasarkan NIP dan Nama.
- NIP tidak boleh duplikat.
- Pegawai nonaktif tidak tampil pada dropdown default.
- Dokumen lama tetap menyimpan referensi pegawai walaupun pegawai dinonaktifkan.

---

# MASTER KANWIL

## Tujuan
Menyimpan daftar Kantor Wilayah.

## Atribut
- Kode
- Nama Kanwil
- Provinsi

## Business Rules
- Kode unik.
- Digunakan sebagai datasource placeholder {{kanwil}}.

---

# MASTER KANTAH

## Tujuan
Menyimpan daftar Kantor Pertanahan.

## Relasi
Setiap Kantah wajib memiliki satu Kanwil.

## Business Rules
- Filter berdasarkan Kanwil.
- Digunakan sebagai datasource placeholder {{kantah}}.

---

# Validation

- Seluruh master menggunakan Form Request.
- Validasi unik untuk kode dan NIP.
- Soft delete digunakan agar histori dokumen tetap valid.

---

# Acceptance Criteria

- Seluruh master dapat digunakan ulang oleh semua template.
- Tidak ada hardcode daftar pegawai, kanwil, atau kantah.
- Dynamic Form dapat mengambil data melalui datasource master.

---

## [SIMDO-Batch-3.2] 05_MASTER_DATA.md

# 05_MASTER_DATA (Part 2)

# Purpose

Master wilayah menjadi referensi geografis yang digunakan oleh seluruh template dokumen.

---

# Hierarki Wilayah

Provinsi
↓
Kabupaten/Kota
↓
Kecamatan
↓
Kelurahan/Desa

Seluruh relasi wajib menggunakan foreign key.

---

# MASTER PROVINSI

## Tujuan
Menyimpan daftar provinsi.

## Atribut
- Kode
- Nama

## Business Rules
- Kode unik.
- Tidak boleh dihapus apabila masih memiliki Kabupaten/Kota.

---

# MASTER KABUPATEN/KOTA

## Tujuan
Menyimpan daftar Kabupaten/Kota.

## Relasi
1 Provinsi memiliki banyak Kabupaten/Kota.

## Atribut
- Provinsi
- Kode
- Nama

## Business Rules
- Filter berdasarkan Provinsi.
- Kode unik dalam satu provinsi.

---

# MASTER KECAMATAN

## Relasi
1 Kabupaten/Kota memiliki banyak Kecamatan.

## Business Rules
- Filter berdasarkan Kabupaten/Kota.
- Mendukung pencarian nama.

---

# MASTER KELURAHAN/DESA

## Relasi
1 Kecamatan memiliki banyak Kelurahan/Desa.

## Business Rules
- Filter berdasarkan Kecamatan.
- Digunakan sebagai datasource placeholder lokasi.

---

# Dynamic Lookup

Dropdown bertingkat:

Provinsi
→ Kabupaten/Kota
→ Kecamatan
→ Kelurahan

Perubahan pilihan parent harus me-refresh child.

---

# Validation

- Nama wajib diisi.
- Kode wajib unik.
- Foreign key wajib valid.

---

# Acceptance Criteria

- Seluruh wilayah dapat digunakan ulang oleh semua template.
- Cascade dropdown berjalan dengan benar.
- Tidak ada input wilayah manual jika data tersedia di master.

---

# Catatan Implementasi untuk Claude

Data wilayah (Provinsi/Kabupaten/Kecamatan/Kelurahan) di Indonesia jumlahnya besar (puluhan ribu baris untuk Kelurahan). Gunakan dropdown bertingkat dengan pencarian (typeahead/AJAX), jangan render seluruh data sekaligus ke satu select.

---

## [SIMDO-Batch-3.3] 17_SECURITY.md

# 17_SECURITY

# Purpose

Menetapkan standar keamanan aplikasi SIMDO agar seluruh modul memiliki mekanisme keamanan yang konsisten.

---

# Authentication

Versi 1.0 menggunakan autentikasi berbasis Laravel Authentication.

Fitur:
- Login
- Logout
- Session Timeout
- Remember Login (opsional)

Password wajib disimpan menggunakan hashing bawaan Laravel.

---

# Authorization

Hak akses menggunakan Role Based Access Control (RBAC).

Role awal:

## Administrator
Hak akses penuh terhadap seluruh modul.

## Operator
- Membuat dokumen
- Melihat riwayat dokumen
- Tidak dapat mengubah master data
- Tidak dapat mengubah template

---

# Permission Matrix

Administrator:
- CRUD Master Data
- CRUD Template
- Publish Template
- Generate Dokumen
- Kelola User

Operator:
- Generate Dokumen
- Lihat Riwayat
- Download DOCX/PDF

---

# Session Security

- Session otomatis berakhir jika tidak aktif.
- Logout menghapus session aktif.
- CSRF wajib aktif pada seluruh form.

---

# File Security

Template DOCX disimpan di storage/app/templates.

Hasil generate disimpan di storage/app/generated.

File tidak boleh diakses langsung melalui URL publik.

Download harus melalui controller yang melakukan pengecekan hak akses.

---

# Validation

- Semua request menggunakan FormRequest.
- Validasi server-side wajib.
- Jangan percaya data dari browser.

---

# Audit Log

Catat aktivitas berikut:

- Login
- Logout
- Upload Template
- Publish Template
- Generate Dokumen
- Hapus Master Data
- Restore Master Data

Data audit minimal:
- User
- Waktu
- Modul
- Aksi
- IP Address

---

# Security Rules

- Tidak ada query mentah tanpa parameter binding.
- Gunakan Eloquent atau Query Builder.
- Hindari hardcoded credential.
- File .env tidak boleh diakses publik.

---

# Acceptance Criteria

- Pengguna tanpa hak akses tidak dapat membuka modul.
- Seluruh aksi penting tercatat.
- Seluruh upload tervalidasi.
- Seluruh download memerlukan autentikasi.

---

# Role Pimpinan (Keputusan)

Sudah diputuskan: Pimpinan TIDAK memiliki akun/akses ke sistem SIMDO. Pimpinan hanya menerima dokumen hasil generate di luar aplikasi (fisik, email, atau cara lain di luar sistem), sehingga tidak perlu Login, Role, maupun Permission tersendiri.

Sistem hanya mengenal dua role: Administrator dan Operator (lihat Permission Matrix di atas). Referensi Pimpinan pada 01_PROJECT_VISION (Stakeholder) bersifat kontekstual bisnis saja, bukan role sistem — jangan buat tabel, migration, middleware, atau Policy untuk Pimpinan.

---

# Upload Security (Tambahan)

Aturan tambahan untuk upload Template DOCX:

- Ukuran file maksimum: 10 MB (dapat dikonfigurasi via .env, bukan hardcode).
- Tolak file `.docm`, `.dotm`, atau DOCX apa pun yang mengandung macro/VBA project.
- DOCX adalah arsip ZIP: validasi struktur internal (mis. `[Content_Types].xml` harus ada) dan cegah path traversal / zip-slip saat ekstraksi (jangan izinkan entry path yang mengandung `../`).
- Jalankan antivirus/malware scan pada file sebelum diproses Template Analyzer, jika infrastruktur mendukung (mis. ClamAV).
- Simpan file asli hasil upload secara read-only setelah tersimpan; proses analisis dan styling hanya boleh membaca salinannya.

---

# Catatan Implementasi untuk Claude

- Validasi upload (ekstensi, ukuran, macro, struktur ZIP) wajib dilakukan di Service, bukan di Controller.
- Sistem hanya perlu 2 role (Administrator, Operator). Jangan buat model/tabel/middleware untuk Pimpinan.
- Audit Log wajib mencatat percobaan upload yang ditolak beserta alasannya (bukan hanya upload yang berhasil).


---

## [SIMDO-Batch-4.1] 06_TEMPLATE_STUDIO.md

# 06_TEMPLATE_STUDIO

# Purpose

Template Studio adalah modul utama SIMDO yang mengelola seluruh template DOCX sebagai sumber pembuatan dokumen.

Aplikasi tidak mengenal jenis dokumen, hanya mengenal Template.

---

# Design Principles

- Template adalah sumber kebenaran (Source of Truth).
- Layout tidak dibuat ulang oleh aplikasi.
- Semua perubahan format dilakukan melalui template DOCX.
- Satu template dapat memiliki banyak versi.

---

# Lifecycle

Create
↓
Upload DOCX
↓
Draft
↓
Placeholder Mapping
↓
Validation
↓
Published
↓
Archived

Generator hanya menggunakan template dengan status Published.

---

# Metadata Template

Minimal menyimpan:

- Nama Template
- Kategori Dokumen
- Nomor Versi
- Deskripsi
- Status
- Tanggal Upload
- Uploaded By

---

# Upload Rules

File yang diterima:

- .docx

Tidak menerima:

- .doc
- .pdf
- .odt

Ukuran maksimum dapat dikonfigurasi.

---

# Versioning

Setiap perubahan menghasilkan Template Version baru.

Status versi:
- Draft
- Published
- Archived

Business Rules:
- Hanya satu versi Published.
- Draft dapat diedit.
- Archived tidak dapat digunakan untuk generate.

---

# Publish Rules

Sebelum Publish:

- Template valid.
- Seluruh placeholder telah dimapping.
- Tidak ada placeholder duplikat.
- Tidak ada placeholder kosong.

---

# Archive Rules

Template tidak boleh dihapus permanen.

Jika sudah tidak digunakan:

Published
↓
Archived

Riwayat generate tetap dapat mengakses versi lama.

---

# Business Rules

- Template tidak boleh diedit setelah Published.
- Perubahan harus membuat versi baru.
- Upload tidak otomatis Publish.
- Template wajib memiliki kategori.

---

# Acceptance Criteria

- Admin dapat mengelola template tanpa mengubah source code.
- Versioning berjalan konsisten.
- Riwayat versi tersimpan.
- Generator hanya menggunakan versi Published.

---

## [SIMDO-Batch-4.2] 06_TEMPLATE_STUDIO.md

# 06_TEMPLATE_STUDIO (Part 2)

# Purpose

Mendefinisikan alur operasional Template Studio mulai dari upload template hingga siap digunakan oleh Document Engine.

---

# Workflow

1. Administrator membuat Template baru.
2. Mengisi metadata template.
3. Mengunggah file DOCX.
4. Sistem menyimpan sebagai Draft.
5. Administrator melakukan Placeholder Mapping.
6. Sistem melakukan validasi.
7. Administrator melakukan Preview.
8. Template dipublish.
9. Template siap digunakan.

---

# Upload Process

Input:
- Nama Template
- Kategori
- Deskripsi
- File DOCX

Output:
- Template Draft
- Template Version 1

Validasi:
- Ekstensi .docx
- File tidak rusak
- Nama template unik pada kategori yang sama

---

# Placeholder Mapping

Administrator menentukan:

- Nama Placeholder
- Label Form
- Tipe Input
- Datasource
- Required
- Repeatable
- Default Value

Belum boleh publish apabila masih ada placeholder yang belum dimapping.

---

# Preview

Preview menampilkan:
- Metadata Template
- Daftar Placeholder
- Status Mapping
- Ringkasan Validation

Tidak mengubah isi template.

---

# Publish Process

Syarat:
- Template valid
- Mapping selesai
- Tidak ada placeholder duplikat
- Minimal satu versi tersedia

Saat publish:
- Status Draft menjadi Published
- Versi Published sebelumnya menjadi Archived

---

# Edit Process

Template Published tidak dapat diedit.

Administrator harus:

Published
↓
Create New Version
↓
Edit Draft
↓
Publish

---

# Archive Process

Template hanya dapat diarsipkan jika:
- Tidak menjadi versi aktif
- Tidak sedang digunakan proses generate

---

# Error Handling

Sistem harus menolak:
- File DOCX rusak
- Placeholder duplikat
- Placeholder tanpa tipe
- Publish tanpa mapping selesai

---

# Acceptance Criteria

- Workflow mengikuti lifecycle.
- Hanya satu versi Published.
- Riwayat versi tetap tersedia.
- Semua perubahan melalui versioning.
- Tidak ada perubahan langsung pada template Published.

# Claude Implementation Notes

Gunakan Service terpisah:
- TemplateService
- TemplateVersionService
- TemplatePublishService
- TemplateValidationService
- TemplatePreviewService

---

## [06.3_TEMPLATE_ANALYZER] 06.3_TEMPLATE_ANALYZER.md

# 06.3_TEMPLATE_ANALYZER

# Template Analyzer

## Purpose

Template Analyzer adalah modul yang bertugas membaca file DOCX secara otomatis setelah administrator mengunggah template.

Administrator tidak perlu lagi membuat seluruh placeholder secara manual.

Analyzer akan mengekstrak struktur dokumen kemudian menghasilkan metadata awal yang dapat diperbaiki oleh administrator.

---

# Design Principles

- Analyzer hanya membaca.
- Analyzer tidak pernah mengubah isi file DOCX.
- Analyzer tidak menghasilkan dokumen.
- Analyzer hanya menghasilkan metadata.

---

# Workflow

Upload DOCX

↓

Analyzer membaca file

↓

Ekstrak Placeholder

↓

Ekstrak Font

↓

Ekstrak Style

↓

Ekstrak Header

↓

Ekstrak Footer

↓

Ekstrak Table

↓

Ekstrak Image Placeholder

↓

Ekstrak Repeat Area

↓

Menyusun Metadata

↓

Administrator Review

↓

Publish

---

# Analyzer Components

- Document Parser
- Style Parser
- Placeholder Parser
- Table Parser
- Header Footer Parser
- Image Parser
- Repeat Block Parser
- Metadata Builder
- Validation Engine

---

# Font Detection

Analyzer harus mengenali:

- Nama Font
- Ukuran Font
- Bold
- Italic
- Underline
- Color
- Highlight
- Character Style
- Paragraph Style

---

# Layout Detection

Analyzer membaca:

- Margin
- Orientation
- Paper Size
- Header
- Footer
- Page Break
- Section
- Table
- Merge Cell
- Indentation
- Spacing

---

# Placeholder Detection

Analyzer mencari pola:

{{placeholder}}

Contoh:

{{nomor_surat}}

Menjadi metadata:

- nama: nomor_surat
- tipe: Text
- label: Nomor Surat
- required: true

---

# Repeat Block Detection

Administrator dapat memberi tanda:

- START_REPEAT
- END_REPEAT

atau menggunakan Bookmark Microsoft Word.

Analyzer mengenali area tersebut sebagai Dynamic Table.

---

# Metadata Builder

Metadata yang dihasilkan:

- Placeholder
- Datasource
- Validation Rule
- Sort Order
- Default Value
- Repeatable
- Condition
- Formula

---

# Validation Report

Analyzer menampilkan:

- Jumlah Placeholder
- Placeholder Ganda
- Placeholder Kosong
- Placeholder Belum Dimapping
- Style Conflict
- Broken Bookmark
- Broken Table

---

# Preview Result

Administrator dapat melihat:

Template Asli

↓

Metadata

↓

Dynamic Form

tanpa harus melakukan Publish.

---

# Business Rules

- Analyzer hanya berjalan saat Upload Template.
- Analyzer tidak berjalan ketika Generate Dokumen.
- Metadata hasil Analyzer masih dapat diedit Administrator.

---

# Acceptance Criteria

- Minimal 90% placeholder dikenali otomatis.
- Administrator hanya melakukan koreksi kecil.
- Template baru dapat dipublikasikan tanpa konfigurasi ulang dari awal.


---

## [06.4_STYLE_ENGINE] 06.4_STYLE_ENGINE.md

# 06.4_STYLE_ENGINE

# Style Engine

## Purpose

Style Engine bertugas menjaga agar hasil dokumen yang dihasilkan SIMDO identik dengan template asli. Engine ini tidak membuat style baru, melainkan membaca, menyimpan, dan menerapkan style yang berasal dari template DOCX.

---

# Design Principles

- Preserve Existing Style
- No Style Mutation
- Template First
- Deterministic Rendering
- Reusable

---

# Workflow

Upload Template

↓

Template Analyzer

↓

Style Engine membaca seluruh style

↓

Style Metadata disimpan

↓

Word Engine menggunakan Style Metadata saat rendering

---

# Style Metadata

Setiap style minimal menyimpan:

- Font Family
- Font Size
- Font Color
- Bold
- Italic
- Underline
- Strike
- Highlight
- Character Style
- Paragraph Style

---

# Paragraph Style

Simpan:

- Alignment
- Indentation
- Line Spacing
- Space Before
- Space After
- Widow/Orphan
- Keep With Next
- Page Break Before

---

# Page Layout

Deteksi dan simpan:

- Paper Size
- Orientation
- Margin
- Header Distance
- Footer Distance
- Section Break
- Page Break

---

# Table Style

Pertahankan:

- Border
- Cell Margin
- Merge Cell
- Vertical Alignment
- Horizontal Alignment
- Background Color
- Auto Fit

---

# Header & Footer

Style Engine harus mempertahankan:

- Logo
- Nomor Halaman
- Watermark
- Tanggal
- Field Word
- Header/Footer Style

---

# Image Rules

- Posisi tidak berubah
- Ukuran mengikuti template
- Rasio dipertahankan
- Mendukung PNG, JPG, SVG

---

# Style Conflict

Jika style placeholder berbeda dengan style template:

1. Gunakan style template.
2. Catat conflict pada log.
3. Jangan mengubah template.

---

# Validation

Validasi:

- Missing Font
- Unsupported Font
- Corrupt Style
- Broken Table Style
- Missing Header/Footer

---

# Business Rules

- Style tidak boleh diedit saat generate.
- Style hanya berubah ketika versi template berubah.
- Semua output DOCX dan PDF wajib mengikuti style template.

---

# Acceptance Criteria

- Font identik dengan template.
- Margin identik.
- Header/Footer identik.
- Tabel identik.
- Hasil visual konsisten dengan template asli.

# Claude Implementation Notes

Implementasikan service:

- StyleEngineService
- FontResolver
- ParagraphStyleResolver
- TableStyleResolver
- LayoutResolver
- StyleValidationService


---

## [06.5_WORKFLOW_ENGINE] 06.5_WORKFLOW_ENGINE.md

# 06.5_WORKFLOW_ENGINE

# Workflow Engine

## Purpose

Workflow Engine mengatur seluruh alur bisnis SIMDO sehingga setiap proses
berjalan konsisten, terdokumentasi, dan dapat diaudit.

Workflow Engine tidak menghasilkan dokumen, tetapi mengendalikan status,
transisi, dan validasi antar proses.

---

# Workflow Utama

Administrator

↓

Upload Template

↓

Template Analyzer

↓

Style Engine

↓

Placeholder Mapping

↓

Validation

↓

Preview

↓

Publish

↓

Operator memilih Template

↓

Dynamic Form terbentuk

↓

Operator mengisi data

↓

Validation

↓

Formula Engine

↓

Document Engine

↓

Word Engine

↓

PDF Engine

↓

History

↓

Download

---

# Workflow Template

Status:

Draft
↓

Validated
↓

Ready to Publish
↓

Published
↓

Archived

Rules:

- Tidak dapat Publish sebelum Validation selesai.
- Published tidak dapat diedit.
- Perubahan menghasilkan Version baru.

---

# Workflow Generate

Requested
↓

Building Form
↓

Input Completed
↓

Validated
↓

Rendering
↓

DOCX Generated
↓

PDF Generated
↓

Stored
↓

Completed

Status gagal:

Failed

---

# Approval Workflow

Opsional untuk versi berikutnya:

Draft
↓

Reviewer

↓

Approved

↓

Published

Reviewer tidak boleh mengubah isi template.

---

# History Workflow

Setiap generate menyimpan:

- Template Version
- User
- Input Snapshot
- Formula Snapshot
- DOCX Path
- PDF Path
- Waktu
- Status

History bersifat immutable.

---

# Recovery Workflow

Jika generate gagal:

- Rollback transaksi
- Simpan log
- Tandai status Failed
- Izinkan Generate ulang

---

# Notification

Trigger:

- Publish berhasil
- Generate berhasil
- Generate gagal
- Template diarsipkan

Notifikasi dapat berupa toast, email, atau sistem notifikasi internal.

---

# Audit Trail

Seluruh perubahan status dicatat:

- Status Lama
- Status Baru
- User
- Timestamp
- IP Address

---

# Business Rules

- Seluruh workflow menggunakan finite state.
- Tidak boleh melompati status.
- Semua transisi harus tervalidasi.
- Workflow tidak bergantung pada jenis dokumen.

---

# Acceptance Criteria

- Setiap proses memiliki status yang jelas.
- Riwayat dapat ditelusuri.
- Workflow konsisten untuk semua template.
- Error tidak menyebabkan data parsial.

# Claude Implementation Notes

Implementasikan:

- WorkflowEngineService
- StateMachine
- WorkflowTransitionService
- AuditTrailService
- NotificationService


---

## [SIMDO-Batch-4.3] 07_PLACEHOLDER_ENGINE.md

# 07_PLACEHOLDER_ENGINE

# Purpose

Placeholder Engine adalah modul yang menerjemahkan placeholder di dalam template DOCX menjadi metadata yang dapat digunakan oleh Dynamic Form Engine dan Document Engine.

---

# Design Principles

- Placeholder adalah metadata, bukan teks biasa.
- Setiap placeholder harus memiliki konfigurasi.
- Placeholder bersifat reusable.
- Placeholder tidak bergantung pada jenis dokumen.

---

# Naming Convention

Gunakan format:

{{nama_placeholder}}

Contoh:
{{nomor_surat}}
{{nama_kasus}}
{{tanggal_mulai}}
{{tanggal_selesai}}
{{pegawai}}
{{kanwil}}
{{kantah}}

Gunakan snake_case.

---

# Placeholder Types

- Text
- Textarea
- Number
- Date
- Time
- Dropdown
- Checkbox
- Radio
- Formula
- Repeatable
- Image
- QRCode

---

# Metadata

Setiap placeholder minimal memiliki:

- Nama
- Label
- Deskripsi
- Tipe
- Required
- Repeatable
- Default Value
- Datasource
- Validation Rule
- Sort Order

---

# Datasource

Datasource dapat berasal dari:

- master_pegawai
- master_kanwil
- master_kantah
- master_provinsi
- master_kabupaten
- master_kecamatan
- master_kelurahan

Atau input manual apabila tidak memiliki master.

---

# Validation

Contoh:

nomor_surat
- Required

pegawai
- Required
- Repeatable

tanggal_mulai
- Required
- Date

tanggal_selesai
- Required
- Date
- Harus >= tanggal_mulai

---

# Placeholder Registry

Setiap placeholder hanya boleh didefinisikan satu kali pada satu versi template.

Nama placeholder harus unik.

---

# Business Rules

- Placeholder tanpa tipe tidak dapat digunakan.
- Placeholder wajib memiliki label.
- Placeholder repeatable hanya digunakan untuk data jamak.
- Perubahan placeholder pada template Published harus melalui versi baru.

---

# Acceptance Criteria

- Semua placeholder berhasil dipetakan menjadi metadata.
- Tidak ada placeholder duplikat.
- Dynamic Form dapat dibangun dari metadata placeholder.

# Claude Implementation Notes

Gunakan service:
- PlaceholderService
- PlaceholderValidationService
- PlaceholderDatasourceService

---

## [SIMDO-Batch-4.4] 07_PLACEHOLDER_ENGINE.md

# 07_PLACEHOLDER_ENGINE (Part 2)

# Purpose

Melengkapi spesifikasi Placeholder Engine agar mampu menangani data tunggal maupun data berulang.

---

# Repeat Block

Repeat Block digunakan ketika satu placeholder mewakili banyak data.

Contoh:
- Daftar Pegawai
- Daftar Lampiran
- Daftar Objek Tanah

Business Rules:
- Minimal 1 baris.
- Admin dapat menentukan jumlah minimum dan maksimum.
- Dynamic Form menyediakan tombol Tambah/Hapus Baris.

---

# Datasource Binding

Placeholder dapat dihubungkan ke master data.

Contoh:
{{pegawai}} -> master_pegawai
{{kanwil}} -> master_kanwil
{{kantah}} -> master_kantah

Binding disimpan sebagai metadata, bukan hardcode.

---

# Lookup

Lookup memungkinkan satu nilai mengisi field lain.

Contoh:
Cari NIP
↓
Nama otomatis
Jabatan otomatis
Unit Kerja otomatis

Lookup dilakukan melalui datasource.

---

# Conditional Placeholder

Placeholder dapat tampil berdasarkan kondisi.

Contoh:
Jika jenis_surat = "Penelitian"
maka tampilkan:
- lokasi_penelitian
- tanggal_mulai
- tanggal_selesai

Jika kondisi tidak terpenuhi, field disembunyikan.

---

# Validation Rules

Mendukung:
- Required
- Min Length
- Max Length
- Numeric
- Date
- Email
- Regex
- Unique
- Custom Rule

Repeatable juga dapat divalidasi per baris.

---

# Default Value

Placeholder dapat memiliki:
- Nilai tetap
- Nilai dari formula
- Nilai dari master data
- Nilai kosong

---

# Rendering Rules

Urutan:
1. Ambil metadata.
2. Bangun form.
3. Validasi input.
4. Jalankan formula.
5. Render placeholder.

---

# Acceptance Criteria

- Repeat Block bekerja tanpa hardcode.
- Lookup mengisi field otomatis.
- Conditional Placeholder berjalan sesuai aturan.
- Seluruh validasi dilakukan sebelum generate.

# Claude Implementation Notes

Service:
- RepeatBlockService
- LookupService
- PlaceholderRenderService
- PlaceholderConditionService
- PlaceholderValidationService

---

## [SIMDO-Batch-5.1] 08_DOCUMENT_ENGINE.md

# 08_DOCUMENT_ENGINE

# Purpose

Document Engine merupakan inti (core) dari SIMDO yang bertanggung jawab menghasilkan dokumen berdasarkan template yang telah dipublikasikan.

Document Engine tidak mengetahui jenis dokumen.
Document Engine hanya mengetahui Template, Placeholder, Metadata, dan Data Input.

---

# Design Principles

- Template Driven
- Metadata Driven
- Stateless
- Reusable
- Tidak membuat layout dokumen

---

# Responsibility

Document Engine bertugas:

- Membaca Template Version Published
- Membaca Metadata Placeholder
- Mengambil nilai dari Dynamic Form
- Menjalankan Formula
- Mengirim data ke Word Engine
- Menyimpan histori generate

---

# Input

Document Engine menerima:

- Template Version ID
- Placeholder Metadata
- Nilai Placeholder
- User Login

Document Engine tidak menerima request HTTP secara langsung.

---

# Output

- Generated DOCX
- Metadata Generate
- History Record

PDF dibuat oleh PDF Engine setelah DOCX selesai.

---

# Workflow

Operator memilih Template
↓

Dynamic Form selesai diisi
↓

Document Engine menerima payload
↓

Validasi Metadata
↓

Validasi Placeholder
↓

Jalankan Formula
↓

Bangun Data Rendering
↓

Kirim ke Word Engine
↓

Simpan Riwayat

---

# Parser DOCX

Parser bertugas:

- Membuka template DOCX
- Membaca placeholder
- Memastikan struktur template valid

Parser tidak melakukan generate.

---

# Metadata Extraction

Metadata yang diambil:

- Template ID
- Version ID
- Daftar Placeholder
- Repeat Block
- Formula
- Datasource

Metadata disimpan pada database saat template dipublish.

Document Engine membaca metadata dari database, bukan dari file DOCX setiap kali generate.

---

# Validation

Sebelum generate:

- Template harus Published
- Placeholder lengkap
- Formula valid
- Datasource tersedia
- Input memenuhi validation rule

Jika salah satu gagal maka proses dihentikan.

---

# Error Handling

Kemungkinan error:

- Template tidak ditemukan
- Template belum Published
- Placeholder hilang
- Formula gagal
- Datasource kosong

Seluruh error harus menghasilkan pesan yang jelas kepada pengguna.

---

# Business Rules

- Satu proses generate hanya menggunakan satu Template Version.
- Template Published tidak boleh berubah saat proses berjalan.
- Generate harus menggunakan database transaction.
- History hanya disimpan apabila generate berhasil.

---

# Acceptance Criteria

- Document Engine dapat digunakan oleh semua jenis dokumen.
- Tidak ada hardcode nama surat.
- Semua proses melalui metadata.
- Output siap diteruskan ke Word Engine.

# Claude Implementation Notes

Gunakan service terpisah:

- DocumentEngineService
- DocumentParserService
- MetadataService
- DocumentValidationService
- DocumentHistoryService

---

## [SIMDO-Batch-5.2] 08_DOCUMENT_ENGINE.md

# 08_DOCUMENT_ENGINE (Part 2)

# Purpose

Menjelaskan alur internal Document Engine setelah menerima data dari Dynamic Form hingga menghasilkan payload siap diproses Word Engine.

---

# Metadata Processing

Document Engine memuat metadata dari database berdasarkan Template Version.

Metadata meliputi:
- Placeholder
- Datasource
- Formula
- Repeat Block
- Validation Rule
- Rendering Order

Metadata tidak dibaca ulang dari file DOCX.

---

# Rendering Pipeline

1. Load Template Version
2. Load Metadata
3. Validasi Input
4. Resolve Datasource
5. Jalankan Formula
6. Bangun Rendering Model
7. Kirim ke Word Engine
8. Simpan History
9. Teruskan ke PDF Engine

---

# Rendering Model

Rendering Model adalah representasi data yang akan menggantikan placeholder.

Contoh:

nomor_surat -> string
pegawai -> array
tanggal_mulai -> date
kanwil -> object

Word Engine hanya membaca Rendering Model.

---

# Transaction Flow

Seluruh proses generate menggunakan database transaction.

BEGIN
↓
Validasi
↓
Generate DOCX
↓
Simpan History
↓
Generate PDF
↓
COMMIT

Jika salah satu gagal:
ROLLBACK

---

# Queue Readiness

Versi 1.0 berjalan secara sinkron.

Arsitektur harus siap dipindahkan ke Queue Laravel tanpa mengubah business logic.

Service tidak boleh bergantung pada Request HTTP.

---

# Document Lifecycle

Requested
↓
Validated
↓
Rendering
↓
DOCX Generated
↓
PDF Generated
↓
Stored
↓
Completed

Status gagal:
Failed

---

# Logging

Catat:
- Template Version
- User
- Durasi Generate
- Error
- Waktu

---

# Retry Policy

Generate dapat diulang apabila:
- DOCX gagal dibuat
- PDF gagal dibuat

Tidak mengulang validasi jika input tidak berubah.

---

# Performance Rules

- Metadata dibaca sekali.
- Hindari query berulang.
- Gunakan eager loading.
- Pisahkan proses berat ke service.

---

# Acceptance Criteria

- Pipeline deterministik.
- Rollback berjalan saat gagal.
- History konsisten.
- Siap diubah menjadi Queue Process.

# Claude Implementation Notes

Service tambahan:
- RenderingPipelineService
- RenderingModelFactory
- TransactionService
- GenerateDocumentAction
- DocumentLoggerService

---

## [SIMDO-Batch-5.3] 09_DYNAMIC_FORM_ENGINE.md

# 09_DYNAMIC_FORM_ENGINE

# Purpose

Dynamic Form Engine bertugas membangun antarmuka input secara otomatis berdasarkan metadata Placeholder yang berasal dari Template Studio.

Tidak ada form yang dibuat secara hardcode untuk setiap jenis dokumen.

---

# Design Principles

- Metadata Driven
- Component Based
- Reusable
- Stateless
- Tidak mengetahui jenis dokumen

---

# Workflow

1. Operator memilih Template.
2. Sistem mengambil Template Version Published.
3. Metadata Placeholder dimuat.
4. Dynamic Form membangun komponen Bootstrap.
5. Operator mengisi data.
6. Validasi dilakukan.
7. Payload dikirim ke Document Engine.

---

# Component Mapping

| Placeholder Type | Bootstrap Component |
|------------------|---------------------|
| Text | Input Text |
| Textarea | Textarea |
| Number | Number Input |
| Date | Date Picker |
| Time | Time Picker |
| Dropdown | Select |
| Checkbox | Checkbox |
| Radio | Radio Button |
| Repeatable | Dynamic Table |
| Image | File Upload |

---

# Repeatable Component

Digunakan untuk data jamak seperti:

- Pegawai
- Lampiran
- Objek Tanah

Fitur:
- Tambah Baris
- Hapus Baris
- Validasi per baris
- Urutan dapat diubah

---

# Lookup

Contoh:

Input NIP
↓

Cari Master Pegawai
↓

Isi otomatis:
- Nama
- Jabatan
- Unit Kerja

Lookup dijalankan melalui AJAX.

---

# Dynamic Validation

Validation dibaca dari metadata.

Contoh:
- Required
- Date
- Numeric
- Max Length
- Min Length
- Regex

Tidak boleh ada validation hardcode.

---

# UI Rules

- Bootstrap 5
- Responsive
- Label konsisten
- Error Message di bawah field
- Required diberi tanda (*)

---

# Submission

Setelah valid:

Dynamic Form menghasilkan Payload JSON yang berisi seluruh placeholder beserta nilainya.

Document Engine hanya menerima payload ini.

---

# Acceptance Criteria

- Form otomatis berubah sesuai Template.
- Repeatable berjalan.
- Lookup otomatis.
- Validation berasal dari metadata.
- Tidak ada perubahan source code ketika Template baru ditambahkan.

# Claude Implementation Notes

Gunakan service:

- DynamicFormService
- ComponentFactory
- ValidationResolver
- LookupService
- PayloadBuilder

---

## [SIMDO-Batch-5.4] 10_FORMULA_ENGINE.md

# 10_FORMULA_ENGINE

# Purpose

Formula Engine menghitung nilai placeholder secara otomatis berdasarkan metadata template sebelum proses render ke Word Engine.

---

# Design Principles

- Metadata Driven
- Deterministic
- Reusable
- Tidak bergantung pada jenis dokumen
- Formula tidak mengubah template

---

# Workflow

1. Dynamic Form selesai.
2. Document Engine memuat metadata.
3. Formula Engine mengevaluasi seluruh formula.
4. Nilai hasil formula dimasukkan ke Rendering Model.
5. Word Engine melakukan render.

---

# Built-in Function

## DATEDIFF
Menghitung selisih hari.

Contoh:
DATEDIFF(tanggal_mulai, tanggal_selesai)

---

## TERBILANG

Mengubah angka menjadi huruf Bahasa Indonesia.

Contoh:
5
↓

"Lima"

---

## CONCAT

Menggabungkan beberapa nilai.

CONCAT(nama, " - ", nip)

---

## TODAY

Menghasilkan tanggal saat generate.

---

## LOOKUP

Mengambil nilai dari datasource berdasarkan key.

Contoh:
LOOKUP(master_pegawai, nip, jabatan)

---

## IF

IF(kondisi, nilai_true, nilai_false)

---

# Evaluation Order

1. Default Value
2. Lookup
3. Formula
4. Conditional
5. Final Validation

---

# Dependency

Formula dapat membaca:
- Placeholder lain
- Datasource
- Nilai tetap

Formula tidak boleh mengubah datasource.

---

# Error Handling

Jika formula gagal:
- Catat log
- Hentikan generate
- Tampilkan pesan yang jelas

---

# Performance Rules

- Evaluasi sekali per placeholder.
- Cache hasil lookup pada proses yang sama.
- Hindari evaluasi berulang.

---

# Business Rules

- Formula hanya berjalan saat generate.
- Placeholder manual tidak ditimpa kecuali dikonfigurasi.
- Formula harus dapat diuji secara terpisah (unit test).

---

# Acceptance Criteria

- Semua formula menghasilkan output konsisten.
- Formula dapat digunakan lintas template.
- Tidak ada hardcode pada implementasi.

# Formula Parsing Security (Tambahan)

Fungsi seperti IF, LOOKUP, CONCAT, TERBILANG terlihat seperti bahasa ekspresi yang dievaluasi saat runtime. Ini WAJIB diimplementasikan sebagai parser whitelist (daftar fungsi yang eksplisit didukung), BUKAN dengan eval(), create_function(), atau evaluasi PHP dinamis apa pun. Formula yang tidak dikenali parser harus gagal dengan pesan error, bukan dieksekusi.

---

# Claude Implementation Notes

Service:
- FormulaEngineService
- FormulaParser
- FormulaEvaluator
- LookupResolver
- TerbilangService

---

## [SIMDO-Batch-6.1] 11_WORD_ENGINE.md

# 11_WORD_ENGINE

# Purpose

Word Engine bertanggung jawab menghasilkan file DOCX akhir berdasarkan Template Version yang telah diproses oleh Document Engine.

Word Engine tidak melakukan validasi bisnis dan tidak mengambil data dari database.

---

# Design Principles

- Template First
- Preserve Formatting
- Deterministic Output
- Stateless
- Reusable

---

# Input

- Template DOCX
- Rendering Model
- Metadata Placeholder

---

# Output

- Generated DOCX

---

# Workflow

1. Buka Template DOCX
2. Muat Rendering Model
3. Ganti seluruh placeholder
4. Render Repeat Block
5. Render Image (jika ada)
6. Simpan DOCX
7. Kirim ke PDF Engine

---

# Rendering Rules

Word Engine hanya mengganti placeholder.

Tidak boleh:
- Mengubah margin
- Mengubah font
- Mengubah ukuran huruf
- Mengubah spacing
- Mengubah page break
- Mengubah header/footer

---

# Placeholder Rendering

Placeholder tunggal:
{{nomor_surat}}

Placeholder repeat:
{{pegawai}}

Placeholder image:
{{ttd_kepala}}

---

# Repeat Block

Digunakan untuk:
- Daftar Pegawai
- Lampiran
- Daftar Objek

Engine harus menambah atau mengurangi baris sesuai jumlah data.

---

# Table Handling

- Pertahankan merge cell
- Pertahankan border
- Pertahankan alignment
- Pertahankan style tabel

---

# Header & Footer

Placeholder di Header dan Footer harus ikut dirender.

---

# Image Rendering

Mendukung:
- Logo
- Tanda Tangan
- QR Code

Ukuran mengikuti template.

---

# Error Handling

- Template rusak
- Placeholder tidak ditemukan
- Gagal menyimpan DOCX

Seluruh error harus dicatat ke log.

---

# Acceptance Criteria

- Hasil DOCX identik dengan template.
- Seluruh placeholder terganti.
- Repeat Block berjalan.
- Header/Footer ikut dirender.

# Claude Implementation Notes

Service:
- WordEngineService
- PlaceholderRenderer
- RepeatBlockRenderer
- ImageRenderer
- DocxWriter

---

## [SIMDO-Batch-6.2] 12_PDF_ENGINE.md

# 12_PDF_ENGINE

# Purpose

PDF Engine bertanggung jawab mengubah DOCX hasil Word Engine menjadi PDF tanpa mengubah isi maupun tata letak dokumen.

---

# Design Principles

- DOCX adalah sumber utama.
- PDF dibuat setelah DOCX berhasil.
- Tidak mengubah isi dokumen.
- Hasil deterministik.

---

# Workflow

1. Terima DOCX dari Word Engine
2. Validasi file
3. Konversi DOCX menjadi PDF
4. Simpan PDF
5. Perbarui History
6. Kembalikan lokasi file

---

# Input

- Generated DOCX
- Metadata Dokumen

# Output

- Generated PDF

---

# Conversion Rules

- Margin mengikuti DOCX
- Font mengikuti DOCX
- Header/Footer dipertahankan
- Nomor halaman dipertahankan
- Tabel tidak berubah

---

# File Naming

Format:

<nomor_dokumen>.docx
<nomor_dokumen>.pdf

Jika nomor belum tersedia gunakan UUID.

---

# Storage

storage/app/generated/
├── docx/
└── pdf/

---

# History Integration

History menyimpan:
- Path DOCX
- Path PDF
- Waktu Generate
- User
- Template Version

---

# Error Handling

- DOCX tidak ditemukan
- Konversi gagal
- Penyimpanan gagal

Seluruh error dicatat ke log.

---

# Performance

- Jangan konversi ulang jika PDF sudah ada dan DOCX tidak berubah.
- Siapkan implementasi queue untuk versi berikutnya.

---

# Acceptance Criteria

- PDF identik secara visual dengan DOCX.
- File tersimpan dengan aman.
- Riwayat terbarui setelah konversi berhasil.

# Claude Implementation Notes

Gunakan service:
- PdfEngineService
- PdfConverterService
- PdfStorageService
- DocumentHistoryService

---

## [12.1_HISTORY_ENGINE] 12.1_HISTORY_ENGINE.md

# 12.1_HISTORY_ENGINE

# History Engine

## Purpose

History Engine menyimpan seluruh aktivitas pembuatan dokumen sehingga setiap
dokumen dapat ditelusuri, diverifikasi, diunduh kembali, dan diregenerasi
menggunakan Template Version yang sama.

History bersifat immutable (tidak dapat diubah secara langsung).

---

# Design Principles

- Immutable Record
- Audit Ready
- Version Aware
- Traceable
- Reproducible

---

# Workflow

Generate Request
↓

Document Engine

↓

Word Engine

↓

PDF Engine

↓

History Engine

↓

Store Metadata

↓

Store Snapshot

↓

Completed

---

# Data yang Disimpan

Informasi minimal:

- History ID
- Nomor Dokumen
- Template ID
- Template Version
- User
- Tanggal Generate
- Status
- Lama Proses
- Ukuran DOCX
- Ukuran PDF

---

# Snapshot

History wajib menyimpan snapshot:

- Placeholder
- Nilai Placeholder
- Formula Result
- Datasource Result

Snapshot memastikan dokumen dapat diregenerasi meskipun master data berubah.

---

# File Information

Simpan:

- Path DOCX
- Path PDF
- Hash DOCX
- Hash PDF

Hash digunakan untuk verifikasi integritas file.

---

# Search & Filter

Pencarian berdasarkan:

- Nomor Dokumen
- Nama Template
- Nama User
- Rentang Tanggal
- Status

---

# Regenerate

Administrator dapat melakukan regenerate menggunakan:

- Template Version lama
- Snapshot lama

Regenerate tidak membaca master data terbaru kecuali dipilih secara eksplisit.

---

# Download

Pengguna dapat:

- Download DOCX
- Download PDF

Hak akses mengikuti Role.

---

# Retention Policy

History tidak boleh dihapus.

Jika diperlukan:

- Archive
- Restore

Tetapi record tetap tersedia untuk audit.

---

# Audit Trail

Setiap aktivitas dicatat:

- Download
- Regenerate
- Restore
- Archive

Informasi:

- User
- Timestamp
- IP Address
- Action

---

# Business Rules

- History dibuat hanya jika generate berhasil.
- Failed Generate tetap menghasilkan log error.
- Snapshot tidak boleh diubah.

---

# Acceptance Criteria

- Dokumen lama dapat ditelusuri.
- Regenerate menghasilkan output identik.
- Riwayat dapat dicari dengan cepat.
- Audit lengkap tersedia.

# Claude Implementation Notes

Implementasikan:

- HistoryEngineService
- HistoryRepository
- SnapshotService
- RegenerateService
- FileIntegrityService
- HistorySearchService


---

## [SIMDO-Batch-7.1] 13_UI_GUIDELINE.md

# 13_UI_GUIDELINE

# Purpose

Menetapkan standar antarmuka pengguna agar seluruh modul SIMDO memiliki tampilan yang konsisten, mudah digunakan, dan mudah dipelihara.

---

# Design Goals

- Sederhana
- Konsisten
- Responsif
- Mudah dipelajari
- Berorientasi produktivitas

---

# Technology

- Bootstrap 5
- Blade
- Bootstrap Icons
- Vanilla JavaScript

---

# Layout

Halaman terdiri dari:

- Top Navbar
- Left Sidebar
- Breadcrumb
- Page Header
- Content Area
- Footer

---

# Sidebar

Kelompok menu:

- Dashboard
- Master Data
- Template Studio
- Generate Dokumen
- Riwayat
- Pengaturan

Menu aktif harus memiliki penanda visual.

---

# Form Guideline

- Label di atas field.
- Required menggunakan tanda (*).
- Bantuan (helper text) di bawah field jika diperlukan.
- Error validation muncul tepat di bawah field.

---

# Table Guideline

Gunakan tabel Bootstrap dengan:

- Search
- Pagination
- Sorting
- Empty State
- Loading State

Kolom aksi berada di sisi kanan.

---

# Button Standard

Primary:
- Simpan
- Generate

Secondary:
- Kembali
- Batal

Danger:
- Hapus

Warning:
- Arsipkan

---

# Modal

Digunakan untuk:

- Konfirmasi
- Detail singkat
- Preview ringan

Hindari form panjang di dalam modal.

---

# Notification

Gunakan toast untuk:
- Berhasil
- Gagal
- Informasi

---

# Responsive Rules

Desktop adalah prioritas.

Tablet tetap nyaman digunakan.

Mobile mendukung fungsi utama tanpa kehilangan informasi penting.

---

# Accessibility

- Kontras warna cukup.
- Semua input memiliki label.
- Navigasi keyboard tetap berfungsi.

---

# Acceptance Criteria

- Tampilan seluruh modul konsisten.
- Komponen dapat digunakan ulang.
- Tidak ada inline style yang tidak diperlukan.

# Claude Implementation Notes

Gunakan Blade Component untuk:
- Card
- Button
- Modal
- Table
- Form Field
- Alert

---

## [13.1_DASHBOARD] 13.1_DASHBOARD.md

# 13.1_DASHBOARD

# Dashboard Module

## Purpose

Dashboard menjadi halaman pertama setelah pengguna berhasil login.
Dashboard memberikan ringkasan kondisi sistem, aktivitas terbaru,
serta akses cepat ke fitur utama.

---

# Design Principles

- Ringkas
- Informatif
- Cepat dimuat
- Berbasis Role
- Realtime Ready

---

# Dashboard Layout

Header

↓

Statistik

↓

Quick Action

↓

Aktivitas Terbaru

↓

Grafik

↓

Riwayat Generate

---

# Dashboard Cards

Administrator:

- Total Template
- Template Published
- Template Draft
- Template Archived
- Total Pegawai
- Total Generate Hari Ini
- Total Generate Bulan Ini
- Total Dokumen

Operator:

- Generate Hari Ini
- Riwayat Saya
- Template Favorit
- Draft Terakhir

---

# Quick Actions

- Generate Dokumen
- Upload Template
- Kelola Master Pegawai
- Kelola Kanwil
- Kelola Kantah
- Lihat Riwayat

---

# Recent Activities

Tampilkan 20 aktivitas terakhir:

- Upload Template
- Publish Template
- Generate DOCX
- Generate PDF
- Login
- Restore Template

Kolom:
- Waktu
- User
- Aktivitas
- Status

---

# Charts

Minimal:

- Generate per Hari
- Generate per Bulan
- Template Terbanyak Digunakan
- Dokumen per Jenis
- Aktivitas User

---

# Notification Panel

Menampilkan:

- Generate gagal
- Template belum dipublish
- Master Data belum lengkap
- Update sistem

---

# Search

Global Search:

- Nomor Surat
- Nama Template
- Nama Pegawai
- Nomor Dokumen

---

# Performance

- Statistik menggunakan aggregate query.
- Dashboard tidak membaca seluruh data.
- Siapkan cache untuk statistik.

---

# Business Rules

- Dashboard mengikuti Role.
- Data sensitif hanya tampil untuk Administrator.
- Grafik dapat diperluas tanpa mengubah layout.

---

# Acceptance Criteria

- Halaman terbuka <2 detik pada data normal (didefinisikan sebagai: hingga 10.000 dokumen tersimpan dan 500 template aktif).
- Informasi utama langsung terlihat.
- Seluruh widget dapat digunakan ulang.

# Claude Implementation Notes

Gunakan:

- DashboardController
- DashboardService
- DashboardStatisticService
- DashboardWidgetFactory
- DashboardChartService


---

## [SIMDO-Batch-7.2] 14_CODING_STANDARD.md

# 14_CODING_STANDARD

# Purpose

Dokumen ini menjadi standar penulisan kode seluruh proyek SIMDO agar implementasi konsisten, mudah dipelihara, dan mudah dikembangkan.

---

# General Principles

- PSR-12
- SOLID
- DRY
- KISS
- Clean Architecture
- Convention over Configuration

---

# Technology

- Laravel 12
- PHP 8.3
- Blade
- Bootstrap 5
- MySQL

---

# Folder Convention

Controller:
App\Http\Controllers

Service:
App\Services

Repository:
App\Repositories

Model:
App\Models

Action:
App\Actions

Enum:
App\Enums

Trait:
App\Traits

---

# Controller Rules

Controller hanya:

- menerima request
- memanggil Service
- mengembalikan response

Tidak boleh:

- query database
- business logic
- manipulasi file

---

# Service Rules

Seluruh business logic berada pada Service.

Contoh:
- TemplateService
- DocumentEngineService
- WordEngineService
- PdfEngineService

Service tidak boleh bergantung pada Request HTTP.

---

# Repository Rules

Repository hanya bertugas mengakses database.

Tidak boleh:

- validasi bisnis
- render view
- mengakses session

---

# Model Rules

Model hanya berisi:

- Fillable
- Cast
- Scope
- Relationship

Business logic kompleks dipindahkan ke Service.

---

# Naming Convention

Class:
PascalCase

Method:
camelCase

Variable:
camelCase

Table:
snake_case

Migration:
Laravel default naming.

---

# Validation

Gunakan FormRequest.

Tidak boleh validasi langsung di Controller.

---

# Error Handling

Gunakan Exception.

Jangan menggunakan die(), dd(), var_dump() pada production.

---

# Logging

Gunakan Log::info(), Log::warning(), Log::error().

Setiap proses generate dokumen wajib memiliki log.

---

# Testing

Minimal:

- Feature Test
- Unit Test untuk Formula Engine
- Unit Test untuk Document Engine

---

# Code Review Checklist

- Tidak ada duplicated code
- Tidak ada hardcode
- Query efisien
- Naming jelas
- Method pendek
- Dependency Injection digunakan

---

# Acceptance Criteria

- Seluruh modul mengikuti standar yang sama.
- Mudah dipahami developer lain.
- Siap dikembangkan jangka panjang.

# Claude Implementation Notes

Claude wajib mempertahankan standar ini ketika membuat atau memodifikasi kode.

---

## [SIMDO-Batch-7.3] 16_DEVELOPMENT_RULES.md

# 16_DEVELOPMENT_RULES

# Purpose

Dokumen ini menetapkan aturan pengembangan proyek SIMDO agar seluruh proses implementasi berjalan konsisten, terdokumentasi, dan mudah dipelihara.

---

# Development Workflow

1. Analisis kebutuhan
2. Perbarui dokumentasi
3. Implementasi
4. Unit Test
5. Code Review
6. Integration Test
7. Deployment

Dokumentasi harus diperbarui sebelum implementasi fitur besar.

---

# Git Branch Strategy

main
- Branch produksi.

develop
- Branch integrasi.

feature/<nama-fitur>
- Pengembangan fitur baru.

hotfix/<nama-fix>
- Perbaikan bug produksi.

release/<versi>
- Persiapan rilis.

---

# Commit Convention

Format:

type: deskripsi singkat

Contoh:
- feat: tambah template studio
- fix: perbaiki placeholder repeat
- refactor: pisahkan document engine
- docs: update ERD
- test: tambah unit test formula

---

# Pull Request Rules

Setiap Pull Request harus:
- Memiliki deskripsi perubahan.
- Menyebutkan modul yang terdampak.
- Lulus code review.
- Lulus testing.

---

# Migration Policy

- Satu migration untuk satu tabel.
- Jangan mengubah migration lama yang sudah dipakai.
- Perubahan struktur menggunakan migration baru.
- Seeder dipisahkan dari migration.

---

# Versioning

Gunakan Semantic Versioning.

Format:
MAJOR.MINOR.PATCH

Contoh:
1.0.0

---

# Deployment Flow

develop
↓
release
↓
testing
↓
main
↓
production

---

# Bug Fix Policy

Bug diperbaiki pada branch hotfix kemudian di-merge kembali ke develop dan main.

---

# Documentation Rules

Setiap perubahan yang memengaruhi:
- Database
- Arsitektur
- Template
- Placeholder
- Workflow

wajib memperbarui dokumentasi terkait.

---

# Acceptance Criteria

- Riwayat Git mudah ditelusuri.
- Deployment dapat diulang.
- Dokumentasi selalu selaras dengan implementasi.

# Claude Implementation Notes

Claude harus:
- Mengikuti struktur branch.
- Menghasilkan commit yang logis.
- Menyesuaikan dokumentasi saat ada perubahan desain.

---

