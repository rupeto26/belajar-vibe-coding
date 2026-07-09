import * as Html from "@elysiajs/html";
import { Layout } from "./Layout";

export const PegawaiList = ({ data }: { data: any[] }) => (
  <Layout title="Master Pegawai">
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h6 class="mb-0 fw-bold"><i class="bi bi-people me-2"></i>Daftar Pegawai</h6>
        <a href="/pegawai/create" class="btn btn-sm btn-primary">
          <i class="bi bi-plus-lg me-1"></i> Tambah Pegawai
        </a>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="ps-4">NIP</th>
                <th>Nama Lengkap</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr>
                  <td class="ps-4">{p.nip}</td>
                  <td class="fw-medium">{p.nama}</td>
                  <td>{p.jabatan || "-"}</td>
                  <td>
                    {p.status ? (
                      <span class="badge bg-success">Aktif</span>
                    ) : (
                      <span class="badge bg-danger">Nonaktif</span>
                    )}
                  </td>
                  <td class="text-end pe-4">
                    <a href={`/pegawai/edit/${p.id}`} class="btn btn-sm btn-outline-secondary me-2">
                      <i class="bi bi-pencil"></i> Edit
                    </a>
                    <form method="POST" action={`/pegawai/delete/${p.id}`} style="display:inline;" onsubmit="return confirm('Hapus pegawai ini?');">
                      <button type="submit" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i> Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colspan="5" class="text-center py-4 text-muted">Belum ada data pegawai</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
);

export const PegawaiForm = ({ isEdit, data, error }: { isEdit?: boolean; data?: any, error?: string }) => (
  <Layout title={isEdit ? "Edit Pegawai" : "Tambah Pegawai"}>
    <div class="card shadow-sm max-w-md mx-auto" style="max-width: 600px;">
      <div class="card-body p-4">
        {error && <div class="alert alert-danger">{error}</div>}
        <form method="POST" action={isEdit ? `/pegawai/edit/${data.id}` : "/pegawai/create"}>
          <div class="mb-3">
            <label class="form-label fw-bold">NIP</label>
            <input type="text" name="nip" class="form-control" required value={data?.nip || ""} />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Nama Lengkap</label>
            <input type="text" name="nama" class="form-control" required value={data?.nama || ""} />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Jabatan</label>
            <input type="text" name="jabatan" class="form-control" value={data?.jabatan || ""} />
          </div>
          <div class="mb-4">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" name="status" id="status" checked={isEdit ? data.status : true} value="1" />
              <label class="form-check-label" for="status">Pegawai Aktif</label>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <a href="/pegawai" class="btn btn-light border">Batal</a>
            <button type="submit" class="btn btn-primary">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
);
