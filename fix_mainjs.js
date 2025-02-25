const fs = require("fs");
const path = require("path");

// 修正対象の main.js のパス
const mainJsPath = path.join(__dirname, "docs/dist/assets/main.js");

// `main.js` が存在するか確認
if (!fs.existsSync(mainJsPath)) {
  console.error("❌ エラー: main.js が見つかりません！");
  process.exit(1);
}

// `main.js` を読み込む
let content = fs.readFileSync(mainJsPath, "utf8");

// **パスを GitHub Pages 用に自動修正**
// 例: "./Resources/Haru/Haru.model3.json" → "/dual-support-local/Resources/Haru/Haru.model3.json"
content = content.replace(
  /"\.\/Resources\//g,
  '"/dual-support-local/Resources/'
);

// **修正後の内容を保存**
fs.writeFileSync(mainJsPath, content, "utf8");

console.log("✅ main.js のリソースパスを修正しました！");
