import { logAPI } from "@repo/logger";
import type {
  Country,
  Player,
  PlayerPosition,
  PlayerCareer,
} from "@repo/types";
import { Router } from "express";
import type { Request, Response } from "express";
import axios from "../../axios.ts";

type PlayerWithouPosition = Omit<Player, "position">;

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

router.get("/positions", async (req: Request, res: Response) => {
  try {
    logAPI("positions are being fetched!");
    const response = await axios.get(`/positions`);
    const positions: PlayerPosition[] = response.data.data || [];
    res.status(200).json({ positions });
  } catch (error) {
    res.status(500).json({ error: "Error fetching positions data" });
  } finally {
    logAPI("positions are fetched");
  }
});

router.post("/players", async (req: Request, res: Response) => {
  try {
    logAPI("players are being fetched!");
    const country_id = req.query.country_id;

    if (!country_id) {
      res.status(400).json({ error: "Country ID is required" });
      return;
    }

    const response = await axios.get(`/players`, {
      params: {
        filter: {
          country_id,
        },
      },
    });

    const players: Player[] = response.data.data || [];

    //remove position from each player for sake of example
    const playersWithoutPosition: PlayerWithouPosition[] = players.map(
      ({ position, ...rest }) => rest
    );

    res.status(200).json({ player: playersWithoutPosition });
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
    const player: Player = response.data.data || [];

    //remove position from a player for sake of example
    const { position, ...rest } = player;
    const playerWithoutPosition: PlayerWithouPosition = rest;

    res.status(200).json({ player: playerWithoutPosition });
  } catch (error) {
    res.status(500).json({ error: "Error fetching player data" });
  } finally {
    logAPI("player is fetched");
  }
});

router.get("/players/:id/position", async (req: Request, res: Response) => {
  try {
    logAPI("player position is being fetched!");
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "Player ID is required" });
      return;
    }

    const response = await axios.get(`/positions/${id}`);
    const position: PlayerPosition = response.data.data || [];
    res.status(200).json({ position });
  } catch (error) {
    res.status(500).json({ error: "Error fetching player position data" });
  } finally {
    logAPI("player position is fetched");
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
    const career: PlayerCareer = response.data.data || [];
    res.status(200).json({ career });
  } catch (error) {
    res.status(500).json({ error: "Error fetching player career data" });
  } finally {
    logAPI("player career is fetched");
  }
});

export default router;
