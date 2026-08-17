import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

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
    port: 6959,
    strictPort: true,
    allowedHosts: ["marketplace.sharpnr.test"],
  },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
