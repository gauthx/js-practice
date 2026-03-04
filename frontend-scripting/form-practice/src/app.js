import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import Players from "./players.js";

export const createApp = () => {
  const app = new Hono();
  const playerStore = new Players();
  app.use(logger());
  app.post("/register", async (context) => {
    const { playerName, club, nation } = await context.req.json();
    playerStore.register(playerName, club, nation);
    return context.te
  });

  app.get("/all-players", (context) => context.json(playerStore.getAll()));

  app.get("*", serveStatic({ root: "public" }));
  return app;
};
