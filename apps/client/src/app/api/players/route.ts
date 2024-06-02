import type { Player } from "@repo/types";
import { type NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL || "";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const countryId = searchParams.get("countryId");

  if (!countryId) {
    return NextResponse.json({ error: "Country ID is required" });
  }

  const response = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        country_id: countryId,
      },
    }),
  });

  const players = (await response.json()) as Player[];
  return NextResponse.json({ players });
}
