import type {
  Career,
  Player,
  PlayerCareer,
  TransformedPlayerCareer,
} from "@repo/types";
import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
      dateofbirth: aggregatedResponse.dateofbirth,
      gender: aggregatedResponse.gender,
      battingstyle: aggregatedResponse.battingstyle,
      bowlingstyle: aggregatedResponse.bowlingstyle,
      position: aggregatedResponse.position.name,
      career: aggregatedResponse.career.map((careerItem) => ({
        player_id: careerItem.player_id,
        type: careerItem.type,
        bowling: careerItem.bowling,
        batting: careerItem.batting,
      })),
    };

    return NextResponse.json({ player: transformedResponse });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching player data" });
  }
}
