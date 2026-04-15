import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 6963,
    strictPort: true,
    allowedHosts: ["accounting.sharpnr.test"],
  },
  preview: {
    port: 6863,
    strictPort: true,
  },
});
