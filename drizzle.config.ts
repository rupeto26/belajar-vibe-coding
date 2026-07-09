
import { defineConfig } from "drizzle-kit";
import { config } from "./src/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: `mysql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
  },
});
