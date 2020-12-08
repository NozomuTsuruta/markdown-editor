import { useState } from "react";

export const useStateWithStorage = (
  init: string,
  key: string
): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);

  const setValueWithStorage = (nextValue: string) => {
    localStorage.setItem(key, nextValue);
    setValue(nextValue);
  };

  return [value, setValueWithStorage];
};

// メインスレッドから Web Worker を読み込む
// メインスレッド内で Web Worker の結果を受け取るコールバック関数を onmessage にセットする
// メインスレッドから Web Worker に postMessage でデータを送信する
// Web Worker は onmessage の関数でデータを受け取って処理を行う
// Web Worker は postMessage でメインスレッドに処理結果を返却する
// メインスレッドは onmessage に登録した関数から処理結果を受け取る
// 3〜6 を必要に応じて繰り返す
