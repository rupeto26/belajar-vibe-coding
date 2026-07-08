import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as Html from "@elysiajs/html";
import { config } from "./src/config";
import { userRoutes } from "./src/routes";
import { Dashboard } from "./src/views/Dashboard";

const app = new Elysia()
  .use(html())
  .onError(({ error, set }) => {
    console.error(error);
    set.status = 500;
    return { error: "Internal Server Error" };
  })
  .get("/", () => <Dashboard />)
  .use(userRoutes)
  .listen(config.app.port);

console.log(`🚀 Server running at http://localhost:${config.app.port}`);