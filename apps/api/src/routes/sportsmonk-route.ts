import { log } from "@repo/logger";
import { Router } from "express";
import type { Request, Response } from "express";
import axios from "../../axios.ts";
import type { AxiosResponse } from "../../axios.ts";

const API_KEY = process.env.SPORTMONKS_API_KEY;

const router: Router = Router();
router.get("/livescore", (_req: Request, _res: Response) => {
  axios(`/leagues?api_token=${API_KEY}`)
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((error) => {
      log(error);
      return error.data;
    });
});

export default router;
