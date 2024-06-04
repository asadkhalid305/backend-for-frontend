import { logClient } from "@repo/logger";
import type { Country, Player, TransformedPlayerCareer } from "@repo/types";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface PlayersData {
  players: Player[];
}

interface PlayerStatisticsData {
  player: TransformedPlayerCareer;
}

interface UsePlayerProps {
  filteredCountries: Country[];
  selectedCountry: Country;
  selectedPlayer: Player;
}

export default function usePlayers({
  filteredCountries,
  selectedCountry,
  selectedPlayer,
}: UsePlayerProps): {
  players: Player[];
  filteredPlayers: Player[];
  playerStatistics: TransformedPlayerCareer;
  loadingPlayers: boolean;
  loadingPlayerStatistics: boolean;
  setSearchPlayer: Dispatch<SetStateAction<string>>;
  playersMessage: string;
  playerStatisticsMessage: string;
} {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerStatistics, setPlayerStatistics] =
    useState<TransformedPlayerCareer>({} as TransformedPlayerCareer);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [loadingPlayerStatistics, setLoadingPlayerStatistics] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState<string>("");

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
    setSearchPlayer("");
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
    setSearchPlayer("");
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

  const filteredPlayers = players.filter((player) =>
    player.fullname.toLowerCase().includes(searchPlayer.toLowerCase())
  );

  let playersMessage = "";

  if (filteredCountries.length > 0 && !selectedCountry.id) {
    playersMessage = "Select a country";
  } else if (filteredPlayers.length === 0) {
    playersMessage = "No players found";
  }

  let playerStatisticsMessage = "";
  if (filteredCountries.length === 0 || filteredPlayers.length === 0) {
    playerStatisticsMessage = "No statistics available";
  } else if (filteredPlayers.length > 0 && !selectedPlayer.id) {
    playerStatisticsMessage = "Select a player";
  } else {
    playerStatisticsMessage = "No statistics found";
  }

  return {
    players,
    filteredPlayers,
    loadingPlayers,
    playerStatistics,
    loadingPlayerStatistics,
    setSearchPlayer,
    playersMessage,
    playerStatisticsMessage,
  };
}
