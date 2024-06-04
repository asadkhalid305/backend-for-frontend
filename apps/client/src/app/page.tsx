"use client";

import type { Country, Player } from "@repo/types";
import { useState } from "react";
import useCountries from "../hooks/use-countries";
import usePlayers from "../hooks/use-players";
import ListPlayerStats from "./components/list-player-stats";
import LoadingSkeleton from "./components/loading-skeleton";
import ItemsWrapper from "./components/items-wrapper";
import Header from "./components/header";

export default function PlayerApp(): JSX.Element {
  const { countries, loadingCountries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    {} as Country
  );
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({} as Player);
  const { players, playerStats, loadingPlayers, loadingPlayerStats } =
    usePlayers({
      selectedCountry,
      selectedPlayer,
    });

  return (
    <main className="px-4 max-w-screen-xl h-screen mx-auto overflow-hidden">
      <Header />
      <section className="h-[calc(100%-160px)] flex">
        <div className="w-1/4">
          <ItemsWrapper<Country>
            heading="Countries"
            items={countries}
            loading={loadingCountries}
            selectedItem={selectedCountry}
            setSelectedItem={setSelectedCountry}
          />
        </div>
        <div className="w-1/4">
          <ItemsWrapper<Player>
            heading="Players"
            items={players}
            loading={loadingPlayers}
            selectedItem={selectedCountry}
            setSelectedItem={setSelectedPlayer}
          />
        </div>
        <div className="w-2/4">
          <h2 className="text-xl font-bold text-center">Statistics</h2>
          <div className="h-[calc(100%-28px)] overflow-auto">
            {loadingPlayerStats ? (
              <LoadingSkeleton />
            ) : (
              <ListPlayerStats playerStats={playerStats} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
