import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "",
    base: command === "serve" ? "./" : "/dual-support-local/", // ローカルとGitHub Pagesの切り替え
    resolve: {
      alias: {
        "@framework": path.resolve(__dirname, "Framework/src"),
      },
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: "index.html", // ここをオブジェクト形式に修正
        },
        output: {
          entryFileNames: "assets/[name].js",
        },
      },
    },
  };
});
