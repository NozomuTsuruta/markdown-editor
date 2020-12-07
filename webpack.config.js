const path = require("path");

module.exports = {
  entry: "./src/index.ts", // 最初に読み込むファイル
  module: {
    rules: [
      // build時に追加で行う処理
      {
        test: /\.ts$/, // testのファイルに対して、useのツールを実行
        use: "ts-loader",
        exclude: /node_modules/, // 除外
      },
    ],
  },
  resolve: {
    extensions: [".ts"], // モジュールとして解決する拡張子
  },
  output: {
    // 出力するファイルの設定
    path: path.resolve(__dirname, "dist"), // 出力するディレクトリ
    filename: "index.js", // 出力するファイル
    publicPath: "dist/", // 変換する時に相対パスにdist/を追加
  },
};
