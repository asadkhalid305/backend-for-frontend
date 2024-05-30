import pkg from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import configRoutes from "./routes/index.ts";

const { json, urlencoded } = pkg;

const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  configRoutes(app);

  return app;
};

export default createServer;
