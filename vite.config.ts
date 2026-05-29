import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 6957,
    strictPort: true,
    allowedHosts: ["cortex.sharpnr.test"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
