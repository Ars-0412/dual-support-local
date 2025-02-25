import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig(({ command }) => {
  return {
    assetsInclude: ["**/*.js", "**/*.wasm"],
    publicDir: "docs/Resources", // 🔥 ここを `docs/Resources` に設定（リソースを正しく解決）
    base: "/dual-support-local/", // 🔥 GitHub Pages に合わせる
    resolve: {
      alias: {
        "@framework": path.resolve(__dirname, "Framework/src"),
      },
    },
    build: {
      outDir: "docs/dist", // 🔥 ここを修正（`dist` ではなく `docs/dist` に出力）
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "src/main.ts"), // 🔥 `src/main.ts` をエントリーポイントに設定
        },
        output: {
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },
  };
});
