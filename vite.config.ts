import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from '@tanstack/devtools-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    devtools({
      eventBusConfig: {
        // port to run the event bus on
        port: 1234,
        // console log debug logs or not
        debug: false,
        // enables the server event bus (defaults to true), you can disable it if you're running devtools in something like storybook or vitest
        enabled: false
      },
    }),
    tailwindcss(
      
    ),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
