import type {
  Career,
  Player,
  PlayerCareer,
  TransformedCareer,
  TransformedPlayerCareer,
} from "@repo/types";
import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import lodashStartCase from "lodash/startCase";
import { getAge } from "../../../utils/helpers";

const BASE_URL = process.env.API_BASE_URL || "";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const playerId = params.slug;

  if (!playerId) {
    return NextResponse.json({ error: "Player ID is required" });
  }

  try {
    const [playerResponse, playerCareerResponse] = await Promise.all([
      axios.get(`${BASE_URL}/api/players/${playerId}`),
      axios.get(`${BASE_URL}/api/players/${playerId}/career`),
    ]);

    const player = playerResponse.data as Player;
    const career = playerCareerResponse.data as Career[];

    const aggregatedResponse: PlayerCareer = {
      ...player,
      career,
    };

    const transformedResponse: TransformedPlayerCareer = {
      id: aggregatedResponse.id,
      fullname: aggregatedResponse.fullname,
      image_path: aggregatedResponse.image_path,
      age: getAge(aggregatedResponse.dateofbirth),
      gender: aggregatedResponse.gender === "m" ? "Male" : "Female",
      battingstyle: lodashStartCase(aggregatedResponse.battingstyle),
      bowlingstyle: lodashStartCase(aggregatedResponse.bowlingstyle),
      position: aggregatedResponse.position.name,
      career: aggregatedResponse.career.reduce(
        (acc: TransformedCareer[], careerItem: Career) => {
          const transformedCareerItem: TransformedCareer = {
            player_id: careerItem.player_id,
            type: careerItem.type,
            bowling: careerItem.bowling,
            batting: careerItem.batting,
          };

          const existingItemIndex = acc.findIndex(
            (item) => item.type === careerItem.type
          );

          if (existingItemIndex !== -1) {
            acc[existingItemIndex] = {
              ...acc[existingItemIndex],
              bowling: {
                matches:
                  (acc[existingItemIndex].bowling?.matches || 0) +
                  (transformedCareerItem.bowling?.matches || 0),
                innings:
                  (acc[existingItemIndex].bowling?.innings || 0) +
                  (transformedCareerItem.bowling?.innings || 0),
                strike_rate:
                  (acc[existingItemIndex].bowling?.strike_rate || 0) +
                  (transformedCareerItem.bowling?.strike_rate || 0),
                overs:
                  (acc[existingItemIndex].bowling?.overs || 0) +
                  (transformedCareerItem.bowling?.overs || 0),
                average:
                  (acc[existingItemIndex].bowling?.average || 0) +
                  (transformedCareerItem.bowling?.average || 0),
                econ_rate: parseFloat(
                  (
                    (acc[existingItemIndex].bowling?.econ_rate || 0) +
                    (transformedCareerItem.bowling?.econ_rate || 0)
                  ).toFixed(2)
                ),
                runs:
                  (acc[existingItemIndex].bowling?.runs || 0) +
                  (transformedCareerItem.bowling?.runs || 0),
                wickets:
                  (acc[existingItemIndex].bowling?.wickets || 0) +
                  (transformedCareerItem.bowling?.wickets || 0),
                wide:
                  (acc[existingItemIndex].bowling?.wide || 0) +
                  (transformedCareerItem.bowling?.wide || 0),
                noball:
                  (acc[existingItemIndex].bowling?.noball || 0) +
                  (transformedCareerItem.bowling?.noball || 0),
                four_wickets:
                  (acc[existingItemIndex].bowling?.four_wickets || 0) +
                  (transformedCareerItem.bowling?.four_wickets || 0),
                rate:
                  (acc[existingItemIndex].bowling?.rate || 0) +
                  (transformedCareerItem.bowling?.rate || 0),
              },
              batting: {
                matches:
                  (acc[existingItemIndex].batting?.matches || 0) +
                  (transformedCareerItem.batting?.matches || 0),
                innings:
                  (acc[existingItemIndex].batting?.innings || 0) +
                  (transformedCareerItem.batting?.innings || 0),
                strike_rate:
                  (acc[existingItemIndex].batting?.strike_rate || 0) +
                  (transformedCareerItem.batting?.strike_rate || 0),
                runs_scored:
                  (acc[existingItemIndex].batting?.runs_scored || 0) +
                  (transformedCareerItem.batting?.runs_scored || 0),
                not_outs:
                  (acc[existingItemIndex].batting?.not_outs || 0) +
                  (transformedCareerItem.batting?.not_outs || 0),
                highest_inning_score:
                  (acc[existingItemIndex].batting?.highest_inning_score || 0) +
                  (transformedCareerItem.batting?.highest_inning_score || 0),
                balls_faced:
                  (acc[existingItemIndex].batting?.balls_faced || 0) +
                  (transformedCareerItem.batting?.balls_faced || 0),
                average:
                  (acc[existingItemIndex].batting?.average || 0) +
                  (transformedCareerItem.batting?.average || 0),
                four_x:
                  (acc[existingItemIndex].batting?.four_x || 0) +
                  (transformedCareerItem.batting?.four_x || 0),
                six_x:
                  (acc[existingItemIndex].batting?.six_x || 0) +
                  (transformedCareerItem.batting?.six_x || 0),
                hundreds:
                  (acc[existingItemIndex].batting?.hundreds || 0) +
                  (transformedCareerItem.batting?.hundreds || 0),
                fifties:
                  (acc[existingItemIndex].batting?.fifties || 0) +
                  (transformedCareerItem.batting?.fifties || 0),
              },
            };
          } else {
            acc.push(transformedCareerItem);
          }

          return acc;
        },
        []
      ),
    };

    return NextResponse.json({ player: transformedResponse });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching player data" });
  }
}
