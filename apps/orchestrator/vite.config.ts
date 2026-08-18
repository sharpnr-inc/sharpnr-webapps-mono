import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  // One .env at the repo root serves every app; Vite would otherwise
  // only look inside this app's directory.
  envDir: path.resolve(import.meta.dirname, "../.."),
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
    wasm(),
    topLevelAwait(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ["@cedar-policy/cedar-wasm"],
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
    // vite-plugin-top-level-await emits TLA that esbuild cannot downlevel to
    // Vite 8's default browser target. This app already requires wasm + TLA,
    // so raising the target does not change its effective browser floor.
    target: "es2022",
  },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 6969,
    strictPort: true,
    allowedHosts: ["orchestrator.sharpnr.test"],
  },
});
