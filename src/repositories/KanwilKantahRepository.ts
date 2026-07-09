import { eq } from "drizzle-orm";
import { db } from "../db";
import { masterKanwil, masterKantah } from "../db/schema";

export type CreateKanwilDto = {
  kode: string;
  nama: string;
};

export type CreateKantahDto = {
  kanwilId: number;
  kode: string;
  nama: string;
};

export class KanwilKantahRepository {
  // Kanwil
  async findAllKanwil() {
    return db.select().from(masterKanwil);
  }

  async findKanwilById(id: number) {
    const results = await db.select().from(masterKanwil).where(eq(masterKanwil.id, id));
    return results[0] || null;
  }

  async createKanwil(data: CreateKanwilDto) {
    return db.insert(masterKanwil).values(data);
  }

  async updateKanwil(id: number, data: Partial<CreateKanwilDto>) {
    return db.update(masterKanwil).set(data).where(eq(masterKanwil.id, id));
  }

  async deleteKanwil(id: number) {
    return db.delete(masterKanwil).where(eq(masterKanwil.id, id));
  }

  // Kantah
  async findAllKantah() {
    return db.select().from(masterKantah);
  }

  async findKantahById(id: number) {
    const results = await db.select().from(masterKantah).where(eq(masterKantah.id, id));
    return results[0] || null;
  }

  async createKantah(data: CreateKantahDto) {
    return db.insert(masterKantah).values(data);
  }

  async updateKantah(id: number, data: Partial<CreateKantahDto>) {
    return db.update(masterKantah).set(data).where(eq(masterKantah.id, id));
  }

  async deleteKantah(id: number) {
    return db.delete(masterKantah).where(eq(masterKantah.id, id));
  }
}

export const kanwilKantahRepository = new KanwilKantahRepository();
