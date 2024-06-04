import type {
  Player,
  TransformedCareer,
  TransformedPlayerCareer,
} from "@repo/types";
import Image from "next/image";

interface ListPlayerStatisticsProps {
  playerStatistics: TransformedPlayerCareer;
  selectedPlayer: Player;
}

export default function ListPlayerStatistics({
  playerStatistics,
  selectedPlayer,
}: ListPlayerStatisticsProps): JSX.Element {
  function renderValue(
    value: string | TransformedCareer | TransformedCareer[]
  ): JSX.Element | undefined {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item) => (
            <li key={item.player_id}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value?.player_id) {
      return (
        <ul>
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              {key}: {renderValue(val as string)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "string" && value.startsWith("https")) {
      return (
        <Image alt="profile picture" height={120} src={value} width={120} />
      );
    } else if (typeof value === "string") {
      return <>{String(value)}</>;
    }
  }

  return (
    <div>
      {playerStatistics.id ? (
        Object.entries(playerStatistics).map(
          ([key, value]: [string, string | TransformedCareer[]]) => (
            <div key={key}>
              {key}: {renderValue(value)}
            </div>
          )
        )
      ) : (
        <div className="text-center">
          {selectedPlayer.id ? "No statistics available" : "Select a player"}
        </div>
      )}
    </div>
  );
}
