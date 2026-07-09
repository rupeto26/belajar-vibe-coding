import { PegawaiRepository, CreatePegawaiDto, pegawaiRepository } from "../repositories/PegawaiRepository";

export class PegawaiService {
  constructor(private repo: PegawaiRepository) {}

  async getAllPegawai() {
    return this.repo.findAll();
  }

  async getPegawaiById(id: number) {
    return this.repo.findById(id);
  }

  async createPegawai(data: CreatePegawaiDto) {
    if (!data.nip || !data.nama) {
      throw new Error("NIP dan Nama wajib diisi");
    }
    return this.repo.create(data);
  }

  async updatePegawai(id: number, data: Partial<CreatePegawaiDto>) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error("Pegawai tidak ditemukan");
    }
    return this.repo.update(id, data);
  }

  async deletePegawai(id: number) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error("Pegawai tidak ditemukan");
    }
    return this.repo.delete(id);
  }
}

export const pegawaiService = new PegawaiService(pegawaiRepository);
