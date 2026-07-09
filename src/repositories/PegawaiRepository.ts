import { eq } from "drizzle-orm";
import { db } from "../db";
import { masterPegawai } from "../db/schema";

export type CreatePegawaiDto = {
  nip: string;
  nama: string;
  jabatan?: string;
  status?: boolean;
};

export class PegawaiRepository {
  async findAll() {
    return db.select().from(masterPegawai);
  }

  async findById(id: number) {
    const results = await db.select().from(masterPegawai).where(eq(masterPegawai.id, id));
    return results[0] || null;
  }

  async create(data: CreatePegawaiDto) {
    return db.insert(masterPegawai).values({
      nip: data.nip,
      nama: data.nama,
      jabatan: data.jabatan,
      status: data.status !== undefined ? data.status : true,
    });
  }

  async update(id: number, data: Partial<CreatePegawaiDto>) {
    return db.update(masterPegawai).set(data).where(eq(masterPegawai.id, id));
  }

  async delete(id: number) {
    return db.delete(masterPegawai).where(eq(masterPegawai.id, id));
  }
}

export const pegawaiRepository = new PegawaiRepository();
