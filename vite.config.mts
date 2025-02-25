import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "docs/Resources", // 🔥 `Resources` の参照先を `docs/Resources/` に変更
    base: "./", // GitHub Pages で動くように
    resolve: {
      alias: {
        "@framework": path.resolve(__dirname, "Framework/src"),
      },
    },
    build: {
      outDir: "docs/dist", // 🔥 ここを変更して、`docs/assets/` にビルド
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
