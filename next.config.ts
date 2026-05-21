import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "http://localhost:456/api/graphql",
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
