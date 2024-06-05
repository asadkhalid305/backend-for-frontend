import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.API_BASE_URL || "";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing so we can handle it manually
  },
};

export async function handler(req: NextRequest): Promise<NextResponse> {
  const { pathname, searchParams } = req.nextUrl;
  const path = pathname.replace("/api", "");
  const url = `${BASE_URL}/api${path}`;

  try {
    // Setup Axios config
    const axiosConfig = {
      method: req.method,
      url,
      headers: {
        ...Object.fromEntries(req.headers.entries()),
        host: BASE_URL, // Ensure host header is set correctly
      },
      data: req.body,
      params: Object.fromEntries(searchParams.entries()),
    };

    // Forward the request to the backend
    const response = await axios(axiosConfig);

    // Send the response back to the client
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
