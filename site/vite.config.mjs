import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  collectRouteDefinitions,
  routeToOutputFile,
} from "./scripts/generate-route-pages.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const routeInputs = Object.fromEntries(
  collectRouteDefinitions().map((route) => [
    route.path === "/" ? "home" : route.path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, ""),
    path.join(root, routeToOutputFile(route.path)),
  ]),
);

export default defineConfig({
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: routeInputs,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
