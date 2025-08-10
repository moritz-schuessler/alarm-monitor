import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.url = req.url?.replace(/^\/api\/backend/, "/api") || req.url;

  return new Promise<void>((resolve, reject) => {
    proxy.once("proxyRes", () => resolve());
    proxy.once("error", reject);

    proxy.web(req, res, {
      changeOrigin: true,
      target: process.env.NEXT_PUBLIC_API_PROXY_URL || "http://localhost:3001/",
    });
  });
}
