import type { PlayerCareer } from "@repo/types";
import Image from "next/image";

interface ListPlayerStatsProps {
  playerStats: PlayerCareer;
}

export default function ListPlayerStats({
  playerStats,
}: ListPlayerStatsProps): JSX.Element {
  const renderValue = (
    value:
      | string
      | object
      | Pick<PlayerCareer, "career">
      | Pick<PlayerCareer, "position">
      | Pick<PlayerCareer, "image_path">
  ): JSX.Element => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{renderValue(item as object)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object") {
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
      return <Image alt="" height={120} src={value} width={120} />;
    }
    return <>{String(value)}</>;
  };

  return (
    <div>
      {Object.entries(playerStats).map(([key, value]) => (
        <div key={key}>
          {key}: {renderValue(value)}
        </div>
      ))}
    </div>
  );
}
