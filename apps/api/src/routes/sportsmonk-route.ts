import { logAPI } from "@repo/logger";
import type { Country, Player, PlayerCareer, Career } from "@repo/types";
import { Router } from "express";
import type { Request, Response } from "express";
import axios from "../../axios.ts";

const router: Router = Router();

router.get("/countries", async (req: Request, res: Response) => {
  try {
    logAPI("countries are being fetched!");
    const response = await axios.get(`/countries`);
    const countries: Country[] = response.data.data || [];
    res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({ error: "Error fetching player data" });
  } finally {
    logAPI("countries are fetched");
  }
});

router.post("/players", async (req: Request, res: Response) => {
  try {
    logAPI("players are being fetched!");
    const country_id = req.body?.filter?.country_id;

    if (!country_id) {
      res.status(400).json({ error: "Country ID is required" });
      return;
    }

    const response = await axios.get(`/players`, {
      params: {
        "filter[country_id]": country_id,
      },
    });

    const players: Player[] = response.data.data || [];

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Error fetching players data" });
  } finally {
    logAPI("players are fetched");
  }
});

router.get("/players/:id", async (req: Request, res: Response) => {
  try {
    logAPI("player is being fetched!");
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "Player ID is required" });
      return;
    }

    const response = await axios.get(`/players/${id}`);
    const player: Player = response.data.data || {};

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: "Error fetching player data" });
  } finally {
    logAPI("player is fetched");
  }
});

router.get("/players/:id/career", async (req: Request, res: Response) => {
  try {
    logAPI("player career is being fetched!");
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "Player ID is required" });
      return;
    }

    const response = await axios.get(`/players/${id}`, {
      params: {
        include: "career",
      },
    });
    const playerCareer: PlayerCareer = response.data.data || {};
    // @Note: sending only career data for example purposes
    // In BFF, we are ombining this response with Player data
    const careers: Career[] = playerCareer.career || [];
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching player career data" });
  } finally {
    logAPI("player career is fetched");
  }
});

export default router;
