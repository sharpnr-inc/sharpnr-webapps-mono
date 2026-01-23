import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    
    devtools({
      eventBusConfig: {
        // port to run the event bus on
        port: 1234,
        // console log debug logs or not
        debug: false,
        // enables the server event bus (defaults to true), you can disable it if you're running devtools in something like storybook or vitest
        enabled: false,
      },
    }),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 👈 enables virtual module in dev
      },
      manifest: {
        name: "Sharpnr",
        short_name: "Sharpnr",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/AppIcon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/AppIcon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@hospitalityapp": path.resolve(__dirname, "src/_hospitalityapp"),
    },
  },

  server:{
    allowedHosts :[
       ".trycloudflare.com", // 👈 allow all Cloudflare quick tunnels
    ]
  }
});
