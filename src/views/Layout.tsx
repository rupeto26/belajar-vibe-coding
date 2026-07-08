import * as Html from "@elysiajs/html";

export const Layout = ({ children, title = "SIMDO Dashboard" }: { children: any, title?: string }) => (
  <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - SIMDO</title>
      {/* Bootstrap 5 CSS */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <style>
        {`
          body {
            background-color: #f8f9fa;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }
          .sidebar {
            min-height: 100vh;
            background-color: #343a40;
            color: #fff;
          }
          .sidebar a {
            color: rgba(255, 255, 255, .75);
            text-decoration: none;
            padding: 10px 15px;
            display: block;
            border-radius: 4px;
            margin-bottom: 5px;
          }
          .sidebar a:hover, .sidebar a.active {
            color: #fff;
            background-color: rgba(255, 255, 255, .1);
          }
          .navbar {
            box-shadow: 0 2px 4px rgba(0,0,0,.08);
          }
          .card {
            border: none;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            border-radius: 0.5rem;
          }
        `}
      </style>
    </head>
    <body>
      <div class="container-fluid">
        <div class="row">
          {/* Sidebar */}
          <nav class="col-md-3 col-lg-2 d-md-block sidebar py-3">
            <h4 class="text-center mb-4 text-white fw-bold">
              <i class="bi bi-file-earmark-text me-2"></i>SIMDO
            </h4>
            <div class="position-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="/">
                    <i class="bi bi-speedometer2 me-2"></i> Dashboard
                  </a>
                </li>
                <li class="nav-item mt-3 mb-1 text-uppercase text-muted small fw-bold px-3">
                  Master Data
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="bi bi-person-badge me-2"></i> Pegawai
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="bi bi-building me-2"></i> Instansi
                  </a>
                </li>
                <li class="nav-item mt-3 mb-1 text-uppercase text-muted small fw-bold px-3">
                  Dokumen
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="bi bi-file-earmark-plus me-2"></i> Template Studio
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="bi bi-journal-text me-2"></i> Riwayat
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light">
            {/* Top Navbar */}
            <nav class="navbar navbar-expand-lg navbar-light bg-white mx-n4 px-4 mb-4">
              <div class="container-fluid">
                <span class="navbar-brand mb-0 h1 fw-bold text-primary">{title}</span>
                <div class="d-flex">
                  <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <i class="bi bi-person-circle me-1"></i> Administrator
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#">Profile</a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item text-danger" href="#">Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>

            {/* Page Content */}
            {children}
            
            <footer class="mt-5 pt-3 text-muted text-center text-small border-top">
              <p class="mb-1">&copy; 2026 SIMDO - Sistem Manajemen Dokumen</p>
            </footer>
          </main>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </html>
);
