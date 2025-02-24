import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "public",
    base: command === "serve" ? "./" : "", // ここを "" に変更
    resolve: {
      alias: {
        "@framework": path.resolve(__dirname, "Framework/src"),
      },
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: "index.html",
        },
        output: {
          entryFileNames: "assets/[name].js",
        },
      },
    },
  };
});
