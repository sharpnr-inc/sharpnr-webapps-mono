import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  // One .env at the repo root serves every app.
  envDir: path.resolve(import.meta.dirname, "../.."),
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
    port: 6957,
    strictPort: true,
    allowedHosts: ["cortex.sharpnr.test"],
  },
  build: {
    rollupOptions: {
      output: {
        // Split the shared baseline out of the app bundle. Nearly all of these
        // apps' weight is @sharpnr/ui + TanStack + radix, which changes rarely,
        // while app code changes every deploy -- keeping them in one chunk made
        // every release invalidate the whole download.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          if (id.includes("@tanstack")) return "tanstack";
          if (id.includes("@radix-ui") || id.includes("radix-ui")) return "radix";
          // Everything else falls through to Vite's default chunking, which
          // respects the router's per-route dynamic imports. A catch-all
          // "vendor" bucket here pulled route-lazy libs back into one eager
          // chunk and made the heavy apps considerably worse.
        },
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  preview: {
    port: 6857,
    strictPort: true,
  },
});
