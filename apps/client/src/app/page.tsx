"use client";

import type { Country, Player } from "@repo/types";
import { useState } from "react";
import useCountries from "../hooks/use-countries";
import usePlayers from "../hooks/use-players";
import ListPlayerStatistics from "./components/list-player-statistics";
import ListWrapper from "./components/list-wrapper";
import Header from "./components/header";
import ListItems from "./components/list-items";

export default function PlayerApp(): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    {} as Country
  );
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({} as Player);
  const {
    filteredCountries,
    loadingCountries,
    setSearchCountry,
    countriesMessage,
  } = useCountries();
  const {
    filteredPlayers,
    loadingPlayers,
    playerStatistics,
    loadingPlayerStatistics,
    setSearchPlayer,
    playersMessage,
    playerStatisticsMessage,
  } = usePlayers({
    filteredCountries,
    selectedCountry,
    selectedPlayer,
  });

  return (
    <main className="px-4 max-w-screen-xl h-screen mx-auto overflow-hidden">
      <Header />
      <section className="h-[calc(100%-212px)] pb-16 flex">
        <div className="w-1/4 border-2">
          <ListWrapper
            heading="Countries"
            loading={loadingCountries}
            resource="Country"
            setSearchValue={setSearchCountry}
          >
            <ListItems<Country>
              handleClick={setSelectedCountry}
              items={filteredCountries}
              message={countriesMessage}
            />
          </ListWrapper>
        </div>
        <div className="w-1/4 border-2">
          <ListWrapper
            heading="Players"
            loading={loadingPlayers}
            resource="Player"
            setSearchValue={setSearchPlayer}
          >
            <ListItems<Player>
              handleClick={setSelectedPlayer}
              items={filteredPlayers}
              message={playersMessage}
            />
          </ListWrapper>
        </div>
        <div className="w-2/4 border-2">
          <ListWrapper heading="Statistics" loading={loadingPlayerStatistics}>
            <ListPlayerStatistics
              message={playerStatisticsMessage}
              playerStatistics={playerStatistics}
            />
          </ListWrapper>
        </div>
      </section>
    </main>
  );
}
