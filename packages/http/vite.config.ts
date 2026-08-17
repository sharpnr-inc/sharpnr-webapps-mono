import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      outDirs: ["dist"],
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "SharpHttp",
      formats: ["es"],
      fileName: () => `index.es.js`,
    },
    // axios is a peer dependency -- every consuming app already has it, and
    // bundling a second copy would double it in each app's output.
    rollupOptions: {
      external: ["axios"],
    },
  },
});
