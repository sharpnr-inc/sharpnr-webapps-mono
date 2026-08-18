import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ["docs.sharpnr.test"],

  // This app has route handlers that must run per-request (/api/search, the OG
  // image generator, llms.txt), so it can never be statically exported -- it
  // needs a node process.
  //
  // "standalone" emits a self-contained server with its own pruned
  // node_modules, so the deploy target needs neither pnpm nor the workspace.
  // This is an ESM config, so it is import.meta.dirname, not __dirname.
  output: "standalone",
  outputFileTracingRoot: path.join(import.meta.dirname, "../.."),
};

export default withMDX(config);
