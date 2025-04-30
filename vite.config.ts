import { createRequire } from "node:module";
import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

const require = createRequire(import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: path.join(
            path.dirname(require.resolve("@swmansion/smelter-browser-render")),
            "smelter.wasm",
          ),
          dest: "assets",
        },
        {
          src: path.join(
            path.dirname(require.resolve("@mediapipe/tasks-vision")),
            "wasm",
          ),
          dest: "assets",
          rename: "mediapipe-wasm",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@swmansion/smelter-web-wasm"],
    include: ["@swmansion/smelter-web-wasm > pino"],
  },
  worker: {
    format: "es",
  },
});
