import type { NextConfig } from "next";

const URL = process.env.BACKEND_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
