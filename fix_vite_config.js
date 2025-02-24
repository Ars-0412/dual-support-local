import fs from "fs";
import path from "path";
import { exec } from "child_process";

const PROJECT_DIR = process.cwd();
const DIST_DIR = path.join(PROJECT_DIR, "dist");
const PUBLIC_DIR = path.join(PROJECT_DIR, "public");
const INDEX_HTML = path.join(DIST_DIR, "index.html");
const LIVE2D_CORE_JS = "live2dcubismcore.js";

// ----------------------
// 1. vite.config.mts の修正
// ----------------------
const viteConfigPath = path.join(PROJECT_DIR, "vite.config.mts");
if (fs.existsSync(viteConfigPath)) {
  let viteConfig = fs.readFileSync(viteConfigPath, "utf-8");

  // `base` 設定を修正（ローカル / GitHub Pages 切り替え対応）
  viteConfig = viteConfig.replace(
    /base:\s*".*?"/g,
    `base: command === "serve" ? "./" : "/dual-support-local/"`
  );

  // `rollupOptions.input` の設定修正
  viteConfig = viteConfig.replace(
    /input:\s*\{.*?\}/gs,
    `input: { main: "index.html" }`
  );

  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log("✅ vite.config.mts の `base` & `input` を修正しました！");
} else {
  console.log("⚠ vite.config.mts が見つかりません！");
}

// ----------------------
// 2. index.html の修正
// ----------------------
if (fs.existsSync(INDEX_HTML)) {
  let indexHtml = fs.readFileSync(INDEX_HTML, "utf-8");

  // `script` のパス修正（ローカル & GitHub Pages 両対応）
  indexHtml = indexHtml.replace(
    /<script\s+src=".*?live2dcubismcore\.js".*?>/g,
    `<script src="./live2dcubismcore.js"></script>`
  );

  indexHtml = indexHtml.replace(
    /<script\s+type="module"\s+src=".*?assets\/main\.js".*?>/g,
    `<script type="module" src="./assets/main.js"></script>`
  );

  fs.writeFileSync(INDEX_HTML, indexHtml);
  console.log("✅ index.html の `script` パスを修正しました！");
} else {
  console.log("⚠ index.html が dist/ 内にありません！");
}

// ----------------------
// 3. live2dcubismcore.js のコピー
// ----------------------
const live2dSrc = path.join(PUBLIC_DIR, LIVE2D_CORE_JS);
const live2dDest = path.join(DIST_DIR, LIVE2D_CORE_JS);

if (!fs.existsSync(live2dDest)) {
  if (fs.existsSync(live2dSrc)) {
    fs.copyFileSync(live2dSrc, live2dDest);
    console.log("✅ live2dcubismcore.js を dist/ にコピーしました！");
  } else {
    console.log("⚠ live2dcubismcore.js が見つかりません！");
  }
}

// ----------------------
// 4. npm run build の実行＆エラーチェック
// ----------------------
console.log("🔄 `npm run build` を実行中...");
exec("npm run build", (error, stdout, stderr) => {
  if (error) {
    console.log(`❌ ビルドエラーが発生: ${stderr}`);
    if (stderr.includes("Could not resolve entry module")) {
      console.log("🔧 `rollupOptions.input` の修正が必要です！");
    }
    if (stderr.includes("Failed to resolve ./assets/main.js")) {
      console.log("🔧 `index.html` 内の script のパスを修正してください！");
    }
    return;
  }

  console.log("✅ ビルド完了！`npm run preview` を実行します...");

  // ----------------------
  // 5. npm run preview の実行
  // ----------------------
  exec("npm run preview", (err, stdout, stderr) => {
    if (err) {
      console.log(`❌ プレビューエラー: ${stderr}`);
      return;
    }
    console.log(
      "🎉 プレビューが正常に開始されました！ http://localhost:5000 を開いて確認してください！"
    );
  });
});
