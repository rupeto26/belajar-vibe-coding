import { KanwilKantahRepository, kanwilKantahRepository, CreateKanwilDto, CreateKantahDto } from "../repositories/KanwilKantahRepository";

export class KanwilKantahService {
  constructor(private repo: KanwilKantahRepository) {}

  // Kanwil
  async getAllKanwil() {
    return this.repo.findAllKanwil();
  }
  async getKanwilById(id: number) {
    return this.repo.findKanwilById(id);
  }
  async createKanwil(data: CreateKanwilDto) {
    if (!data.kode || !data.nama) throw new Error("Kode dan Nama Kanwil wajib diisi");
    return this.repo.createKanwil(data);
  }
  async updateKanwil(id: number, data: Partial<CreateKanwilDto>) {
    return this.repo.updateKanwil(id, data);
  }
  async deleteKanwil(id: number) {
    return this.repo.deleteKanwil(id);
  }

  // Kantah
  async getAllKantah() {
    return this.repo.findAllKantah();
  }
  async getKantahById(id: number) {
    return this.repo.findKantahById(id);
  }
  async createKantah(data: CreateKantahDto) {
    if (!data.kanwilId || !data.kode || !data.nama) throw new Error("Kanwil, Kode, dan Nama Kantah wajib diisi");
    return this.repo.createKantah(data);
  }
  async updateKantah(id: number, data: Partial<CreateKantahDto>) {
    return this.repo.updateKantah(id, data);
  }
  async deleteKantah(id: number) {
    return this.repo.deleteKantah(id);
  }
}

export const kanwilKantahService = new KanwilKantahService(kanwilKantahRepository);
