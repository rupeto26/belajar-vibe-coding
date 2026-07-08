CREATE TABLE `dashboard_statistic_cache` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`cache_key` varchar(255) NOT NULL,
	`value_json` json,
	`generated_at` timestamp DEFAULT (now()),
	CONSTRAINT `dashboard_statistic_cache_id` PRIMARY KEY(`id`),
	CONSTRAINT `dashboard_statistic_cache_cache_key_unique` UNIQUE(`cache_key`)
);
--> statement-breakpoint
CREATE TABLE `generated_document_details` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`generated_document_id` bigint,
	`placeholder` varchar(255) NOT NULL,
	`value` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generated_document_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generated_document_snapshots` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`generated_document_id` bigint,
	`placeholder_snapshot` json,
	`formula_snapshot` json,
	`datasource_snapshot` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `generated_document_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generated_documents` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_version_id` bigint,
	`nomor_dokumen` varchar(255),
	`file_docx` varchar(500),
	`file_pdf` varchar(500),
	`generated_by` bigint,
	`generated_at` timestamp DEFAULT (now()),
	`hash_docx` varchar(255),
	`hash_pdf` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generated_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_kabupaten` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`provinsi_id` bigint,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_kabupaten_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_kantah` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`kanwil_id` bigint,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_kantah_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_kanwil` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_kanwil_id` PRIMARY KEY(`id`),
	CONSTRAINT `master_kanwil_kode_unique` UNIQUE(`kode`)
);
--> statement-breakpoint
CREATE TABLE `master_kecamatan` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`kabupaten_id` bigint,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_kecamatan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_kelurahan` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`kecamatan_id` bigint,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_kelurahan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_pegawai` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nip` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`jabatan` varchar(255),
	`status` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `master_pegawai_id` PRIMARY KEY(`id`),
	CONSTRAINT `master_pegawai_nip_unique` UNIQUE(`nip`)
);
--> statement-breakpoint
CREATE TABLE `master_provinsi` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`kode` varchar(50) NOT NULL,
	`nama` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `master_provinsi_id` PRIMARY KEY(`id`),
	CONSTRAINT `master_provinsi_kode_unique` UNIQUE(`kode`)
);
--> statement-breakpoint
CREATE TABLE `template_analysis_results` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_version_id` bigint,
	`placeholder_metadata` json,
	`font_metadata` json,
	`layout_metadata` json,
	`validation_report` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `template_analysis_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `template_formulas` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`placeholder_id` bigint,
	`formula` varchar(255) NOT NULL,
	`parameter` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `template_formulas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `template_placeholders` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_version_id` bigint,
	`nama` varchar(255) NOT NULL,
	`tipe` varchar(50) NOT NULL,
	`datasource` varchar(255),
	`required` boolean DEFAULT false,
	`repeatable` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `template_placeholders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `template_style_metadata` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_version_id` bigint,
	`style_json` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `template_style_metadata_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `template_versions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_id` bigint,
	`versi` int NOT NULL,
	`file_docx` varchar(500) NOT NULL,
	`status_publish` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `template_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nama` varchar(255) NOT NULL,
	`kategori` varchar(100),
	`deskripsi` text,
	`status` varchar(50) DEFAULT 'Draft',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflow_transitions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`entity_type` varchar(100) NOT NULL,
	`entity_id` bigint NOT NULL,
	`from_status` varchar(50),
	`to_status` varchar(50),
	`user_id` bigint,
	`note` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `workflow_transitions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `generated_document_details` ADD CONSTRAINT `generated_document_details_generated_document_id_generated_documents_id_fk` FOREIGN KEY (`generated_document_id`) REFERENCES `generated_documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `generated_document_snapshots` ADD CONSTRAINT `generated_document_snapshots_generated_document_id_generated_documents_id_fk` FOREIGN KEY (`generated_document_id`) REFERENCES `generated_documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `generated_documents` ADD CONSTRAINT `generated_documents_template_version_id_template_versions_id_fk` FOREIGN KEY (`template_version_id`) REFERENCES `template_versions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `master_kabupaten` ADD CONSTRAINT `master_kabupaten_provinsi_id_master_provinsi_id_fk` FOREIGN KEY (`provinsi_id`) REFERENCES `master_provinsi`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `master_kantah` ADD CONSTRAINT `master_kantah_kanwil_id_master_kanwil_id_fk` FOREIGN KEY (`kanwil_id`) REFERENCES `master_kanwil`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `master_kecamatan` ADD CONSTRAINT `master_kecamatan_kabupaten_id_master_kabupaten_id_fk` FOREIGN KEY (`kabupaten_id`) REFERENCES `master_kabupaten`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `master_kelurahan` ADD CONSTRAINT `master_kelurahan_kecamatan_id_master_kecamatan_id_fk` FOREIGN KEY (`kecamatan_id`) REFERENCES `master_kecamatan`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `template_analysis_results` ADD CONSTRAINT `template_analysis_results_template_version_id_template_versions_id_fk` FOREIGN KEY (`template_version_id`) REFERENCES `template_versions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `template_formulas` ADD CONSTRAINT `template_formulas_placeholder_id_template_placeholders_id_fk` FOREIGN KEY (`placeholder_id`) REFERENCES `template_placeholders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `template_placeholders` ADD CONSTRAINT `template_placeholders_template_version_id_template_versions_id_fk` FOREIGN KEY (`template_version_id`) REFERENCES `template_versions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `template_style_metadata` ADD CONSTRAINT `template_style_metadata_template_version_id_template_versions_id_fk` FOREIGN KEY (`template_version_id`) REFERENCES `template_versions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `template_versions` ADD CONSTRAINT `template_versions_template_id_templates_id_fk` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE no action ON UPDATE no action;