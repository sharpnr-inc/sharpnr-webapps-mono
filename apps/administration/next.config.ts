import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["administration.sharpnr.test"],
  // @sharpnr/ui and its dependency @sharpnr/utils are shipped as TypeScript
  // source (no build step), so Next has to compile them itself.
  transpilePackages: ["@sharpnr/ui", "@sharpnr/utils"],
};

export default nextConfig;
