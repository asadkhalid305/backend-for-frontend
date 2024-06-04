import { logClient } from "@repo/logger";
import type { Country, Player, PlayerCareer } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface PlayersData {
  players: Player[];
}

interface PlayerStatsData {
  player: PlayerCareer;
}

interface UsePlayerProps {
  selectedCountry: Country;
  selectedPlayer: Player;
}

export default function usePlayers({
  selectedCountry,
  selectedPlayer,
}: UsePlayerProps): {
  players: Player[];
  playerStats: PlayerCareer;
  loadingPlayers: boolean;
  loadingPlayerStats: boolean;
} {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerCareer>(
    {} as PlayerCareer
  );
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [loadingPlayerStats, setLoadingPlayerStats] = useState(false);

  useEffect(() => {
    async function getPlayers(): Promise<PlayersData> {
      const response = await axios.get("/api/players", {
        params: {
          countryId: selectedCountry.id,
        },
      });
      const data = response.data as PlayersData;
      return data;
    }

    if (!selectedCountry.id) {
      return;
    }

    setLoadingPlayers(true);
    // reset player's data when country changes
    setPlayers([]);
    setPlayerStats({} as PlayerCareer);
    getPlayers()
      .then((data) => {
        setPlayers(
          data.players.sort((a, b) => a.fullname.localeCompare(b.fullname))
        );
      })
      .catch((error) => {
        logClient(error);
      })
      .finally(() => {
        setLoadingPlayers(false);
      });
  }, [selectedCountry.id]);

  useEffect(() => {
    async function getPlayerStats(): Promise<PlayerStatsData> {
      const response = await axios.get(`/api/players/${selectedPlayer.id}`);
      const data = response.data as PlayerStatsData;
      return data;
    }

    if (!selectedPlayer.id) {
      return;
    }

    setLoadingPlayerStats(true);
    getPlayerStats()
      .then((data) => {
        setPlayerStats(data.player);
      })
      .catch((error) => {
        logClient(error);
      })
      .finally(() => {
        setLoadingPlayerStats(false);
      });
  }, [selectedPlayer.id]);

  return { players, playerStats, loadingPlayers, loadingPlayerStats };
}
