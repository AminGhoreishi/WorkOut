import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.arvanstorage.ir",
      },
      {
        protocol: "https",
        hostname: "*.parspack.com",
      },
      {
        protocol: "https",
        hostname: "*.parspack.net",
      },
      {
        protocol: "https",
        hostname: "*.parspack.ir",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  serverExternalPackages: ["fastest-validator"],
};

export default nextConfig;
