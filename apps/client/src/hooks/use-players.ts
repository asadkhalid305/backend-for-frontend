import { logClient } from "@repo/logger";
import type { Country, Player, TransformedPlayerCareer } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface PlayersData {
  players: Player[];
}

interface PlayerStatisticsData {
  player: TransformedPlayerCareer;
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
  playerStatistics: TransformedPlayerCareer;
  loadingPlayers: boolean;
  loadingPlayerStatistics: boolean;
} {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerStatistics, setPlayerStatistics] =
    useState<TransformedPlayerCareer>({} as TransformedPlayerCareer);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [loadingPlayerStatistics, setLoadingPlayerStatistics] = useState(false);

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
    setPlayerStatistics({} as TransformedPlayerCareer);
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
    async function getPlayerStatistics(): Promise<PlayerStatisticsData> {
      const response = await axios.get(`/api/players/${selectedPlayer.id}`);
      const data = response.data as PlayerStatisticsData;
      return data;
    }

    if (!selectedPlayer.id) {
      return;
    }
    setLoadingPlayerStatistics(true);
    // reset player's statistics when player changes
    setPlayerStatistics({} as TransformedPlayerCareer);
    getPlayerStatistics()
      .then((data) => {
        setPlayerStatistics(data.player);
      })
      .catch((error) => {
        logClient(error);
      })
      .finally(() => {
        setLoadingPlayerStatistics(false);
      });
  }, [selectedPlayer.id]);

  return { players, playerStatistics, loadingPlayers, loadingPlayerStatistics };
}
