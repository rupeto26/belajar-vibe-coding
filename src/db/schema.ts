import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
  text,
  json,
  boolean,
  int,
} from "drizzle-orm/mysql-core";

// ==========================================
// MASTER DATA
// ==========================================

export const masterPegawai = mysqlTable("master_pegawai", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  nip: varchar("nip", { length: 50 }).notNull().unique(),
  nama: varchar("nama", { length: 255 }).notNull(),
  jabatan: varchar("jabatan", { length: 255 }),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
});

export const masterKanwil = mysqlTable("master_kanwil", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  kode: varchar("kode", { length: 50 }).notNull().unique(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const masterKantah = mysqlTable("master_kantah", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  kanwilId: bigint("kanwil_id", { mode: "number" }).references(() => masterKanwil.id),
  kode: varchar("kode", { length: 50 }).notNull(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const masterProvinsi = mysqlTable("master_provinsi", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  kode: varchar("kode", { length: 50 }).notNull().unique(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const masterKabupaten = mysqlTable("master_kabupaten", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  provinsiId: bigint("provinsi_id", { mode: "number" }).references(() => masterProvinsi.id),
  kode: varchar("kode", { length: 50 }).notNull(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const masterKecamatan = mysqlTable("master_kecamatan", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  kabupatenId: bigint("kabupaten_id", { mode: "number" }).references(() => masterKabupaten.id),
  kode: varchar("kode", { length: 50 }).notNull(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const masterKelurahan = mysqlTable("master_kelurahan", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  kecamatanId: bigint("kecamatan_id", { mode: "number" }).references(() => masterKecamatan.id),
  kode: varchar("kode", { length: 50 }).notNull(),
  nama: varchar("nama", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ==========================================
// TEMPLATE ENGINE
// ==========================================

export const templates = mysqlTable("templates", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  nama: varchar("nama", { length: 255 }).notNull(),
  kategori: varchar("kategori", { length: 100 }),
  deskripsi: text("deskripsi"),
  status: varchar("status", { length: 50 }).default('Draft'), // Draft, Published, Archived
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
});

export const templateVersions = mysqlTable("template_versions", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  templateId: bigint("template_id", { mode: "number" }).references(() => templates.id),
  versi: int("versi").notNull(),
  fileDocx: varchar("file_docx", { length: 500 }).notNull(),
  statusPublish: varchar("status_publish", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const templatePlaceholders = mysqlTable("template_placeholders", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  tvId: bigint("tv_id", { mode: "number" }).references(() => templateVersions.id),
  nama: varchar("nama", { length: 255 }).notNull(),
  tipe: varchar("tipe", { length: 50 }).notNull(), // Text, Textarea, Number, Date, Dropdown, Repeatable, Formula
  datasource: varchar("datasource", { length: 255 }),
  required: boolean("required").default(false),
  repeatable: boolean("repeatable").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const templateFormulas = mysqlTable("template_formulas", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  placeholderId: bigint("placeholder_id", { mode: "number" }).references(() => templatePlaceholders.id),
  formula: varchar("formula", { length: 255 }).notNull(),
  parameter: json("parameter"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ==========================================
// DOCUMENT ENGINE
// ==========================================

export const generatedDocuments = mysqlTable("generated_documents", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  tvId: bigint("tv_id", { mode: "number" }).references(() => templateVersions.id),
  nomorDokumen: varchar("nomor_dokumen", { length: 255 }),
  fileDocx: varchar("file_docx", { length: 500 }),
  filePdf: varchar("file_pdf", { length: 500 }),
  generatedBy: bigint("generated_by", { mode: "number" }), // references user_id if users table exists
  generatedAt: timestamp("generated_at").defaultNow(),
  hashDocx: varchar("hash_docx", { length: 255 }),
  hashPdf: varchar("hash_pdf", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const generatedDocumentDetails = mysqlTable("generated_document_details", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  docId: bigint("doc_id", { mode: "number" }).references(() => generatedDocuments.id),
  placeholder: varchar("placeholder", { length: 255 }).notNull(),
  value: text("value"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ==========================================
// ADDON TABLES
// ==========================================

export const templateAnalysisResults = mysqlTable("template_analysis_results", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  tvId: bigint("tv_id", { mode: "number" }).references(() => templateVersions.id),
  placeholderMetadata: json("placeholder_metadata"),
  fontMetadata: json("font_metadata"),
  layoutMetadata: json("layout_metadata"),
  validationReport: json("validation_report"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const templateStyleMetadata = mysqlTable("template_style_metadata", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  tvId: bigint("tv_id", { mode: "number" }).references(() => templateVersions.id),
  styleJson: json("style_json"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const workflowTransitions = mysqlTable("workflow_transitions", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: bigint("entity_id", { mode: "number" }).notNull(),
  fromStatus: varchar("from_status", { length: 50 }),
  toStatus: varchar("to_status", { length: 50 }),
  userId: bigint("user_id", { mode: "number" }),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const generatedDocumentSnapshots = mysqlTable("generated_document_snapshots", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  docId: bigint("doc_id", { mode: "number" }).references(() => generatedDocuments.id),
  placeholderSnapshot: json("placeholder_snapshot"),
  formulaSnapshot: json("formula_snapshot"),
  datasourceSnapshot: json("datasource_snapshot"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dashboardStatisticCache = mysqlTable("dashboard_statistic_cache", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(),
  valueJson: json("value_json"),
  generatedAt: timestamp("generated_at").defaultNow(),
});
