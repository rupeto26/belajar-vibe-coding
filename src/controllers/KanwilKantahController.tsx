import { Elysia, t } from "elysia";
import * as Html from "@elysiajs/html";
import { kanwilKantahService } from "../services/KanwilKantahService";
import { KanwilList, KanwilForm } from "../views/KanwilKantahView";

export const kanwilKantahController = new Elysia({ prefix: "/kanwil" })
  // Tampilkan daftar Kanwil
  .get("/", async () => {
    const data = await kanwilKantahService.getAllKanwil();
    return <KanwilList data={data} />;
  })

  // Tampilkan form tambah Kanwil
  .get("/create", () => <KanwilForm />)

  // Proses tambah Kanwil
  .post("/create", async ({ body, set }) => {
    try {
      await kanwilKantahService.createKanwil({
        kode: body.kode,
        nama: body.nama,
      });
      set.redirect = "/kanwil";
    } catch (err: any) {
      return <KanwilForm data={body} error={err.message} />;
    }
  }, {
    body: t.Object({
      kode: t.String(),
      nama: t.String()
    })
  })

  // Tampilkan form edit Kanwil
  .get("/edit/:id", async ({ params, set }) => {
    const data = await kanwilKantahService.getKanwilById(Number(params.id));
    if (!data) {
      set.redirect = "/kanwil";
      return;
    }
    return <KanwilForm isEdit={true} data={data} />;
  })

  // Proses edit Kanwil
  .post("/edit/:id", async ({ params, body, set }) => {
    try {
      await kanwilKantahService.updateKanwil(Number(params.id), {
        kode: body.kode,
        nama: body.nama
      });
      set.redirect = "/kanwil";
    } catch (err: any) {
      return <KanwilForm isEdit={true} data={{...body, id: params.id}} error={err.message} />;
    }
  }, {
    body: t.Object({
      kode: t.String(),
      nama: t.String()
    })
  })

  // Proses hapus Kanwil
  .post("/delete/:id", async ({ params, set }) => {
    await kanwilKantahService.deleteKanwil(Number(params.id));
    set.redirect = "/kanwil";
  });
