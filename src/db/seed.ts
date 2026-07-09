import { db } from "./index";
import { masterProvinsi } from "./schema";

async function seed() {
  console.log("Seeding Master Provinsi...");
  const provinces = [
    { kode: "11", nama: "Aceh" },
    { kode: "12", nama: "Sumatera Utara" },
    { kode: "13", nama: "Sumatera Barat" },
    { kode: "31", nama: "DKI Jakarta" },
    { kode: "32", nama: "Jawa Barat" },
    { kode: "33", nama: "Jawa Tengah" },
    { kode: "34", nama: "DI Yogyakarta" },
    { kode: "35", nama: "Jawa Timur" },
    { kode: "51", nama: "Bali" },
  ];

  for (const prov of provinces) {
    await db.insert(masterProvinsi).values(prov).onDuplicateKeyUpdate({ set: { nama: prov.nama }});
  }

  console.log("Seeding done!");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
