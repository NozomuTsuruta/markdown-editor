import Dexie from "dexie";

export interface MemoRecord {
  // データの型定義
  datetime: string;
  title: string;
  text: string;
}

const database = new Dexie("markdown-editor"); // データベース名 データベース接続
database.version(1).stores({ memos: "&datetime" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名
const memos: Dexie.Table<MemoRecord, string> = database.table("memos"); // データの型、キーとなるデータの型 テーブル作成

/** データを保存 */
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString(); // ISO8601形式→視認性と取扱に優れる
  await memos.put({ datetime, title, text }); // テーブルに追加
};
