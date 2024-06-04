import type { TransformedCareer, TransformedPlayerCareer } from "@repo/types";
import Image from "next/image";

interface ListPlayerStatisticsProps {
  playerStatistics: TransformedPlayerCareer;
  message: string;
}

export default function ListPlayerStatistics({
  playerStatistics,
  message,
}: ListPlayerStatisticsProps): JSX.Element {
  return playerStatistics.id ? (
    <div className="w-full p-2 flex flex-col items-center">
      <Image
        alt="Player Image"
        className="rounded-full"
        height={96}
        src={playerStatistics.image_path}
        width={96}
      />
      <h3 className="mb-4 mt-2 text-xl font-semibold">
        {playerStatistics.fullname}
      </h3>
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Name</td>
              <td className="px-4 py-4">{playerStatistics.fullname}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Age</td>
              <td className="px-4 py-4">{playerStatistics.age}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Gender</td>
              <td className="px-4 py-4">{playerStatistics.gender}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Position</td>
              <td className="px-4 py-4">
                {playerStatistics.position || "N/A"}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Batting Style</td>
              <td className="px-4 py-4">
                {playerStatistics.battingstyle || "N/A"}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-4 bg-gray-100">Bowling Style</td>
              <td className="px-4 py-4">
                {playerStatistics.bowlingstyle || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full mt-10 text-center">
        <h3 className="text-xl font-bold mb-4">Leagues</h3>
        {playerStatistics.career.map((career: TransformedCareer) => (
          <div className="border-gray-200" key={career.player_id}>
            <div className="py-4 bg-gray-400 text-lg font-semibold">
              {career.type}
            </div>
            <div className="py-4">
              <div className="flex justify-between text-center">
                <div className="w-1/2">
                  <h4 className="font-semibold">Batting</h4>
                  <table className="w-full text-sm text-left rtl:text-right border mt-4">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Runs Scored</td>
                        <td className="px-4 py-4">
                          {career.batting?.runs_scored || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Not Outs</td>
                        <td className="px-4 py-4">
                          {career.batting?.not_outs || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">
                          Highest Inning Score
                        </td>
                        <td className="px-4 py-4">
                          {career.batting?.highest_inning_score || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Balls Faced</td>
                        <td className="px-4 py-4">
                          {career.batting?.balls_faced || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Average</td>
                        <td className="px-4 py-4">
                          {career.batting?.average || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Fours</td>
                        <td className="px-4 py-4">
                          {career.batting?.four_x || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Sixes</td>
                        <td className="px-4 py-4">
                          {career.batting?.six_x || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Hundreds</td>
                        <td className="px-4 py-4">
                          {career.batting?.hundreds || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Fifties</td>
                        <td className="px-4 py-4">
                          {career.batting?.fifties || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Matches</td>
                        <td className="px-4 py-4">
                          {career.batting?.matches || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Innings</td>
                        <td className="px-4 py-4">
                          {career.batting?.innings || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Strike Rate</td>
                        <td className="px-4 py-4">
                          {career.batting?.strike_rate || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-1/2">
                  <h4 className="font-semibold">Bowling</h4>
                  <table className="w-full text-sm text-left rtl:text-right border mt-4">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Overs</td>
                        <td className="px-4 py-4">
                          {career.bowling?.overs || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Average</td>
                        <td className="px-4 py-4">
                          {career.bowling?.average || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Economy Rate</td>
                        <td className="px-4 py-4">
                          {career.bowling?.econ_rate || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Runs</td>
                        <td className="px-4 py-4">
                          {career.bowling?.runs || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Wickets</td>
                        <td className="px-4 py-4">
                          {career.bowling?.wickets || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Wides</td>
                        <td className="px-4 py-4">
                          {career.bowling?.wide || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">No Balls</td>
                        <td className="px-4 py-4">
                          {career.bowling?.noball || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Four Wickets</td>
                        <td className="px-4 py-4">
                          {career.bowling?.four_wickets || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Rate</td>
                        <td className="px-4 py-4">
                          {career.bowling?.rate || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Matches</td>
                        <td className="px-4 py-4">
                          {career.bowling?.matches || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Innings</td>
                        <td className="px-4 py-4">
                          {career.bowling?.innings || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-4 bg-gray-100">Strike Rate</td>
                        <td className="px-4 py-4">
                          {career.bowling?.strike_rate || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-lg text-semibold">{message}</div>
  );
}
