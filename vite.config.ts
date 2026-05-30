import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
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
