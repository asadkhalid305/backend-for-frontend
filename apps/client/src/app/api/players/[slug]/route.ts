import type { Player, PlayerPosition } from "@repo/types";
import { type NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL || "";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const playerId = params.slug;

  if (!playerId) {
    return NextResponse.json({ error: "Player ID is required" });
  }

  let response = await fetch(`${BASE_URL}/players/${playerId}`);
  let player = (await response.json()) as Player;
  response = await fetch(`${BASE_URL}/players/${playerId}/position`);
  const position = (await response.json()) as PlayerPosition;

  player = { ...player, position };

  return NextResponse.json({ player });
}
