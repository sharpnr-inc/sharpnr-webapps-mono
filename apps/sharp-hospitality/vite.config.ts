import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";

const APP_NAME = "Sharp Hospitality by Sharpnr";
const BRAND_NAVY = "#0B0D2E";

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
    VitePWA({
      // "prompt" rather than "autoUpdate": KDS/POS screens must never reload
      // themselves mid-order. The user is asked, and reloads when it is safe.
      registerType: "prompt",
      injectRegister: null,
      manifest: {
        id: "/",
        name: APP_NAME,
        short_name: "Sharp Hospitality",
        description:
          "Hotel, restaurant, bar and infrastructure operations for Sharpnr.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        theme_color: BRAND_NAVY,
        background_color: BRAND_NAVY,
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache the app shell only. API traffic is cross-origin and
        // deliberately left uncached — stale orders/KOTs would be dangerous,
        // and cached responses would outlive an auth session.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },
      // The SW stays out of `npm run dev`; use `npm run build && npm run preview`
      // to exercise install/offline behaviour.
      devOptions: { enabled: false },
    }),
  ],
  server: {
    host: true,
    port: 6965,
    strictPort: true,
    allowedHosts: ["hospitality.sharpnr.test"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 6865,
    strictPort: true,
  },
});
