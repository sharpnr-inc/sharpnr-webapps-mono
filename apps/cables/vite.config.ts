import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  // One .env at the repo root serves every app.
  envDir: path.resolve(__dirname, "../.."),
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 6962,
    strictPort: true,
    allowedHosts: ["cables.sharpnr.test"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  preview: {
    // 68xx mirrors the 69xx dev port; cables runs dev on 6962. This said 6867
    // (sharp-iam's preview port) by copy-paste, so the two collided.
    port: 6862,
    strictPort: true,
  },
});
