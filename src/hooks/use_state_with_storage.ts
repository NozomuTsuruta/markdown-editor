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
