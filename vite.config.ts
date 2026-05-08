import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@tanstack/react-start/server": path.resolve(
          __dirname,
          "src/lib/react-start-server-shim.ts",
        ),
        "@tanstack/react-start/router-manifest": path.resolve(
          __dirname,
          "src/lib/react-start-router-manifest-shim.ts",
        ),
      },
    },
  },
});
