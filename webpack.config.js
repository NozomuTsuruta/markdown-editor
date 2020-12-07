const path = require("path");

module.exports = {
  entry: "./src/index.js", // 最初に読み込むファイル
  output: { // 出力するファイルの設定
    path: path.resolve(__dirname, "dist"), // 出力するディレクトリ
    filename: "index.js", // 出力するファイル
    publicPath: "dist/", // 変換する時に相対パスにdist/を追加
  },
};
