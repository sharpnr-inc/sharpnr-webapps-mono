import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
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
    port: 6867,
    strictPort: true,
  },
});
