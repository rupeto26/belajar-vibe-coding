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
    try {
      return await this.repo.create(data);
    } catch (e: any) {
      if (e.code === 'ER_DUP_ENTRY') throw new Error(`NIP '${data.nip}' sudah terdaftar.`);
      throw e;
    }
  }

  async updatePegawai(id: number, data: Partial<CreatePegawaiDto>) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error("Pegawai tidak ditemukan");
    }
    try {
      return await this.repo.update(id, data);
    } catch (e: any) {
      if (e.code === 'ER_DUP_ENTRY') throw new Error(`NIP '${data.nip}' sudah terdaftar.`);
      throw e;
    }
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
