import { Elysia } from "elysia";

export const userRoutes = new Elysia({ prefix: "/api" })
  .get("/", () => ({ message: "API is running" }));
