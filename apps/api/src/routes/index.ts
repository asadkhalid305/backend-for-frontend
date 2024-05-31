import { log } from "@repo/logger";
import type { Application, Request, Response, NextFunction } from "express";
import sportsmonkRoute from "./sportsmonk-route.ts";

const routes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    log("Routes activated!");
    next();
  });

  app.get("/status", (_, res) => {
    return res.json({ status: "ok" });
  });

  app.use("/api", sportsmonkRoute);

  app.use((_req: Request, res: Response) => {
    res.status(404).send("Route not found!");
  });
};

export default routes;
