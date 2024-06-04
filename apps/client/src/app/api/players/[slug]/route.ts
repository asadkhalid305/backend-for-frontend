import type { Career, Player, PlayerCareer } from "@repo/types";
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
    const careers = playerCareerResponse.data as Career[];

    const aggrResponse: PlayerCareer = {
      ...player,
      career: careers,
    };

    return NextResponse.json({ player: aggrResponse });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching player data" });
  }
}
