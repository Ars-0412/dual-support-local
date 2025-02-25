import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "public", // ✅ `live2dcubismcore.js` を解決できるようにする
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
          main: path.resolve(__dirname, "src/main.ts"), // 🔥 `src/main.ts` をエントリーポイントに設定
        },
        output: {
          entryFileNames: "assets/[name].js",
        },
      },
    },
  };
});
