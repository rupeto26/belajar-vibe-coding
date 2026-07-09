import * as Html from "@elysiajs/html";
import { Layout } from "./Layout";

export const KanwilList = ({ data, successMsg }: { data: any[], successMsg?: string }) => (
  <Layout title="Master Kanwil">
    {successMsg && (
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>{successMsg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    )}
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h6 class="mb-0 fw-bold"><i class="bi bi-building me-2"></i>Daftar Kanwil (Kantor Wilayah)</h6>
        <a href="/kanwil/create" class="btn btn-sm btn-primary">
          <i class="bi bi-plus-lg me-1"></i> Tambah Kanwil
        </a>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="ps-4">Kode Kanwil</th>
                <th>Nama Kanwil</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((k) => (
                <tr>
                  <td class="ps-4 fw-medium">{k.kode}</td>
                  <td>{k.nama}</td>
                  <td class="text-end pe-4">
                    <a href={`/kanwil/edit/${k.id}`} class="btn btn-sm btn-outline-secondary me-2">
                      <i class="bi bi-pencil"></i> Edit
                    </a>
                    <form method="POST" action={`/kanwil/delete/${k.id}`} style="display:inline;" onsubmit="return confirm('Hapus kanwil ini?');">
                      <button type="submit" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i> Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colspan="3" class="text-center py-4 text-muted">Belum ada data kanwil</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
);

export const KanwilForm = ({ isEdit, data, error }: { isEdit?: boolean; data?: any, error?: string }) => (
  <Layout title={isEdit ? "Edit Kanwil" : "Tambah Kanwil"}>
    <div class="card shadow-sm max-w-md mx-auto" style="max-width: 600px;">
      <div class="card-body p-4">
        {error && <div class="alert alert-danger">{error}</div>}
        <form method="POST" action={isEdit ? `/kanwil/edit/${data.id}` : "/kanwil/create"}>
          <div class="mb-3">
            <label class="form-label fw-bold">Kode Kanwil</label>
            <input type="text" name="kode" class="form-control" required value={data?.kode || ""} />
          </div>
          <div class="mb-4">
            <label class="form-label fw-bold">Nama Kanwil</label>
            <input type="text" name="nama" class="form-control" required value={data?.nama || ""} />
          </div>
          <div class="d-flex justify-content-between">
            <a href="/kanwil" class="btn btn-light border">Batal</a>
            <button type="submit" class="btn btn-primary">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
);
