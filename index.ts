import { Elysia } from "elysia";
import { config } from "./src/config";
import { userRoutes } from "./src/routes";

const app = new Elysia()
  .onError(({ error, set }) => {
    console.error(error);
    set.status = 500;
    return { error: "Internal Server Error" };
  })
  .get("/", () => ({ message: "Belajar Vibe Coding API 🚀" }))
  .use(userRoutes)
  .listen(config.app.port);

console.log(`🚀 Server running at http://localhost:${config.app.port}`);