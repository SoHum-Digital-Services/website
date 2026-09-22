import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/panchangam",
        destination: "https://panchangam-eight.vercel.app/panchangam",
      },
      {
        source: "/panchangam/:path*",
        destination: "https://panchangam-eight.vercel.app/panchangam/:path*",
      },
      {
        source: "/static/:path*",
        destination: "https://panchangam-eight.vercel.app/static/:path*",
      },
    ];
  },
};

export default nextConfig;
