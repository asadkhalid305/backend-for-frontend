import type { Player, PlayerPosition } from "@repo/types";
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
    const playerResponse = await axios.get(
      `${BASE_URL}/api/players/${playerId}`
    );
    let player = playerResponse.data as Player;

    const positionResponse = await axios.get(
      `${BASE_URL}/players/${playerId}/position`
    );
    const position = positionResponse.data as PlayerPosition;

    player = { ...player, position };

    return NextResponse.json({ player });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching player data" });
  }
}
