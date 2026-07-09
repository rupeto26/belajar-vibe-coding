import { Elysia, t } from "elysia";
import * as Html from "@elysiajs/html";
import { pegawaiService } from "../services/PegawaiService";
import { PegawaiList, PegawaiForm } from "../views/PegawaiView";

export const pegawaiController = new Elysia({ prefix: "/pegawai" })
  // Tampilkan daftar pegawai
  .get("/", async ({ query }) => {
    const data = await pegawaiService.getAllPegawai();
    let successMsg = "";
    if (query.success === "created") successMsg = "Data Pegawai berhasil ditambahkan!";
    else if (query.success === "updated") successMsg = "Data Pegawai berhasil diperbarui!";
    else if (query.success === "deleted") successMsg = "Data Pegawai berhasil dihapus!";
    
    return <PegawaiList data={data} successMsg={successMsg} />;
  })

  // Tampilkan form tambah
  .get("/create", () => <PegawaiForm />)

  // Proses tambah pegawai
  .post("/create", async ({ body, set }) => {
    try {
      await pegawaiService.createPegawai({
        nip: body.nip,
        nama: body.nama,
        jabatan: body.jabatan,
        status: body.status === "1"
      });
      set.redirect = "/pegawai?success=created";
    } catch (err: any) {
      return <PegawaiForm data={body} error={err.message} />;
    }
  }, {
    body: t.Object({
      nip: t.String(),
      nama: t.String(),
      jabatan: t.Optional(t.String()),
      status: t.Optional(t.String())
    })
  })

  // Tampilkan form edit
  .get("/edit/:id", async ({ params, set }) => {
    const data = await pegawaiService.getPegawaiById(Number(params.id));
    if (!data) {
      set.redirect = "/pegawai";
      return;
    }
    return <PegawaiForm isEdit={true} data={data} />;
  })

  // Proses edit pegawai
  .post("/edit/:id", async ({ params, body, set }) => {
    try {
      await pegawaiService.updatePegawai(Number(params.id), {
        nip: body.nip,
        nama: body.nama,
        jabatan: body.jabatan,
        status: body.status === "1"
      });
      set.redirect = "/pegawai?success=updated";
    } catch (err: any) {
      return <PegawaiForm isEdit={true} data={{...body, id: params.id}} error={err.message} />;
    }
  }, {
    body: t.Object({
      nip: t.String(),
      nama: t.String(),
      jabatan: t.Optional(t.String()),
      status: t.Optional(t.String())
    })
  })

  // Proses hapus pegawai
  .post("/delete/:id", async ({ params, set }) => {
    await pegawaiService.deletePegawai(Number(params.id));
    set.redirect = "/pegawai?success=deleted";
  });
