import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/Fireworks",
  assetPrefix: "/Fireworks/",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
