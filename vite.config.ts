import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host:true,
    port: 6968,
    strictPort: true,
    allowedHosts:["marketing.sharpnr.test"]
  },
  preview: {
    port: 6868,
    strictPort: true,
  },
});
