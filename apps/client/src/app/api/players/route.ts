import type { Player } from "@repo/types";
import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.API_BASE_URL || "";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const countryId = searchParams.get("countryId");

  if (!countryId) {
    return NextResponse.json({ error: "Country ID is required" });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/players`,
      {
        filter: {
          country_id: countryId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const players = response.data as Player[];
    return NextResponse.json({ players });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching players" });
  }
}
