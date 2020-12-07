const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // 最初に読み込むファイル
  module: {
    rules: [
      // build時に追加で行う処理
      {
        test: /\.tsx?$/, // testのファイルに対して、useのツールを実行 tsx? xは任意
        use: "ts-loader",
        exclude: /node_modules/, // 除外
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"], // モジュールとして解決する拡張子(外部ライブラリを使うファイル)
  },
  output: {
    // 出力するファイルの設定
    path: path.resolve(__dirname, "dist"), // 出力するディレクトリ
    filename: "index.js", // 出力するファイル
    publicPath: "dist/", // 変換する時に相対パスにdist/を追加
  },
  devServer: {
      hot: true, // ファイル変更時に自動的に反映
      open: true, // 起動時にブラウザで開く
  }
};
