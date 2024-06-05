import { logAPI } from "@repo/logger";
import type { Application, Request, Response, NextFunction } from "express";
import sportsmonkRoute from "./sportsmonk-route.ts";

const routes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    logAPI("Routes activated!");
    next();
  });

  app.get("/status", (_, res) => {
    return res.json({ message: "OK" });
  });

  app.use("/api", sportsmonkRoute);

  app.use((_req: Request, res: Response) => {
    res.status(404).send({ message: "Route not found" });
  });
};

export default routes;
