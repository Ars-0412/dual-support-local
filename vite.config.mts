import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "public",
    base: command === "serve" ? "./" : "/live2d-web-demo/", // ローカルは "./", GitHubは "/live2d-web-demo/"
    resolve: {
      alias: {
        "@framework": path.resolve(__dirname, "Framework/src"),
      },
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        input: "src/main.ts",
        output: {
          entryFileNames: "assets/[name].js",
        },
      },
    },
  };
});
