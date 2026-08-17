import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackStart({
      // Code splitting is enabled by default in TanStack Start
      router: {
        // Resolved relative to the src directory — must match the file
        // src/router.tsx imports (src/routeTree.gen.ts).
        generatedRouteTree: "./routeTree.gen.ts",
      },
    }),
    // Self-contained Node server output: .output/server/index.mjs
    // (serves the client assets from .output/public, respects PORT/HOST)
    nitroV2Plugin({ preset: "node-server", compatibilityDate: "2026-07-11" }),
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 6958,
    strictPort: true,
    allowedHosts: ["sharpnr.test"],
  },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
