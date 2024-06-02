// pages/api/bff/[[...path]].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const BASE_URL = process.env.API_BASE_URL || ""; // Replace with your backend server base URL

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing so the proxy can handle it
  },
};

const proxy = createProxyMiddleware({
  target: BASE_URL,
  changeOrigin: true,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}
