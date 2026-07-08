import * as Html from "@elysiajs/html";
import { Layout } from "./Layout";

export const Dashboard = () => (
  <Layout title="Dashboard">
    <div class="row g-4 mb-4">
      {/* Statistik Dokumen */}
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-primary text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-2 opacity-75">Total Dokumen</h6>
                <h2 class="mb-0 fw-bold">1,245</h2>
              </div>
              <div class="fs-1 opacity-50">
                <i class="bi bi-file-earmark-check"></i>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top border-white border-opacity-25">
            <small>Dihasilkan bulan ini: <strong>145</strong></small>
          </div>
        </div>
      </div>

      {/* Statistik Template */}
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-success text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-2 opacity-75">Template Aktif</h6>
                <h2 class="mb-0 fw-bold">42</h2>
              </div>
              <div class="fs-1 opacity-50">
                <i class="bi bi-file-earmark-richtext"></i>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top border-white border-opacity-25">
            <small>Menunggu review: <strong>3</strong></small>
          </div>
        </div>
      </div>

      {/* Statistik Pengguna */}
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-info text-white h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-2 opacity-75">Total Pegawai</h6>
                <h2 class="mb-0 fw-bold">8,430</h2>
              </div>
              <div class="fs-1 opacity-50">
                <i class="bi bi-people"></i>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top border-white border-opacity-25">
            <small>Diperbarui: <strong>2 hari lalu</strong></small>
          </div>
        </div>
      </div>

      {/* Aktivitas */}
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-warning text-dark h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-uppercase mb-2 opacity-75">Sistem Health</h6>
                <h2 class="mb-0 fw-bold">Normal</h2>
              </div>
              <div class="fs-1 opacity-50">
                <i class="bi bi-activity"></i>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top border-dark border-opacity-25">
            <small>Waktu respons: <strong>140ms</strong></small>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      {/* Aktivitas Terbaru */}
      <div class="col-lg-8 mb-4">
        <div class="card h-100">
          <div class="card-header bg-white py-3">
            <h6 class="mb-0 fw-bold text-dark"><i class="bi bi-clock-history me-2"></i>Aktivitas Pembuatan Dokumen Terbaru</h6>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-4">No. Dokumen</th>
                    <th>Template</th>
                    <th>Operator</th>
                    <th>Waktu</th>
                    <th class="text-end pe-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ps-4 fw-medium">ST-2026/07/001</td>
                    <td>Surat Tugas Inspeksi</td>
                    <td>Budi Santoso</td>
                    <td><span class="badge bg-secondary">10 mnt lalu</span></td>
                    <td class="text-end pe-4">
                      <button class="btn btn-sm btn-outline-primary"><i class="bi bi-download"></i> DOCX</button>
                    </td>
                  </tr>
                  <tr>
                    <td class="ps-4 fw-medium">BA-2026/07/042</td>
                    <td>Berita Acara Pemeriksaan</td>
                    <td>Siti Aminah</td>
                    <td><span class="badge bg-secondary">1 jam lalu</span></td>
                    <td class="text-end pe-4">
                      <button class="btn btn-sm btn-outline-primary"><i class="bi bi-download"></i> DOCX</button>
                    </td>
                  </tr>
                  <tr>
                    <td class="ps-4 fw-medium">ND-2026/07/018</td>
                    <td>Nota Dinas Internal</td>
                    <td>Andi Wijaya</td>
                    <td><span class="badge bg-secondary">Kemarin</span></td>
                    <td class="text-end pe-4">
                      <button class="btn btn-sm btn-outline-primary"><i class="bi bi-download"></i> DOCX</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer bg-white text-center py-3">
            <a href="#" class="text-decoration-none fw-bold">Lihat Semua Riwayat <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>

      {/* Akses Cepat */}
      <div class="col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-header bg-white py-3">
            <h6 class="mb-0 fw-bold text-dark"><i class="bi bi-lightning-charge me-2"></i>Akses Cepat</h6>
          </div>
          <div class="card-body">
            <div class="d-grid gap-3">
              <button class="btn btn-primary text-start py-3 shadow-sm">
                <i class="bi bi-file-earmark-plus fs-4 me-3 align-middle"></i>
                <span class="fw-bold">Buat Dokumen Baru</span>
              </button>
              <button class="btn btn-outline-success text-start py-3">
                <i class="bi bi-upload fs-4 me-3 align-middle"></i>
                <span class="fw-bold">Upload Template (DOCX)</span>
              </button>
              <button class="btn btn-outline-secondary text-start py-3">
                <i class="bi bi-people fs-4 me-3 align-middle"></i>
                <span class="fw-bold">Kelola Data Pegawai</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
