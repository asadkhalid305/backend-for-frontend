"use client";

import type { Country, Player } from "@repo/types";
import { useState } from "react";
import useCountries from "../hooks/use-countries";
import usePlayers from "../hooks/use-players";
import ListPlayerStatistics from "./components/list-player-statistics";
import ItemsWrapper from "./components/items-wrapper";
import Header from "./components/header";
import ListItems from "./components/list-items";

export default function PlayerApp(): JSX.Element {
  const { countries, loadingCountries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    {} as Country
  );
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({} as Player);
  const { players, playerStatistics, loadingPlayers, loadingPlayerStatistics } =
    usePlayers({
      selectedCountry,
      selectedPlayer,
    });

  return (
    <main className="px-4 max-w-screen-xl h-screen mx-auto overflow-hidden">
      <Header />
      <section className="h-[calc(100%-212px)] pb-16 flex">
        <div className="w-1/4 border-2">
          <ItemsWrapper heading="Countries" loading={loadingCountries}>
            <ListItems<Country>
              handleClick={setSelectedCountry}
              items={countries}
              message={{
                empty: "No countries found",
              }}
              selectedItem={selectedCountry}
            />
          </ItemsWrapper>
        </div>
        <div className="w-1/4 border-2">
          <ItemsWrapper heading="Players" loading={loadingPlayers}>
            <ListItems<Player>
              handleClick={setSelectedPlayer}
              items={players}
              message={{
                required: "Select a country",
                empty: "No players found",
              }}
              selectedItem={selectedCountry}
            />
          </ItemsWrapper>
        </div>
        <div className="w-2/4 border-2">
          <ItemsWrapper heading="Statistics" loading={loadingPlayerStatistics}>
            <ListPlayerStatistics
              playerStatistics={playerStatistics}
              selectedPlayer={selectedPlayer}
            />
          </ItemsWrapper>
        </div>
      </section>
    </main>
  );
}
