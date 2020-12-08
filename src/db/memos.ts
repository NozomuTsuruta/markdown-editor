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

const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count();
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};

/** データを取得 */
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE;
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset) // 取得開始位置
    .limit(NUM_PER_PAGE)
    .toArray();
};
