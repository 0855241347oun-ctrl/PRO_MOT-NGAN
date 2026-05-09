import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "becmzaktwisywsumheqh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

// Final Sync: 2026-05-08

export default nextConfig;
