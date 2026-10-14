import type { NextConfig } from "next";

// The panchangam engine on Google Cloud Run. Vercel paused panchangam-eight.vercel.app
// on 12 Oct 2026. Rewrites are fixed at build time, so override with ENGINE_URL there.
const ENGINE_URL =
  process.env.ENGINE_URL ??
  "https://panchangam-1007417351252.asia-south1.run.app";

const nextConfig: NextConfig = {
  // Self-contained server for the container (see Dockerfile).
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/panchangam",
        destination: `${ENGINE_URL}/panchangam`,
      },
      {
        source: "/panchangam/:path*",
        destination: `${ENGINE_URL}/panchangam/:path*`,
      },
      {
        source: "/static/:path*",
        destination: `${ENGINE_URL}/static/:path*`,
      },
      {
        source: "/v1/:path*",
        destination: `${ENGINE_URL}/v1/:path*`,
      },
      {
        source: "/openapi.json",
        destination: `${ENGINE_URL}/openapi.json`,
      },
    ];
  },
};

export default nextConfig;
