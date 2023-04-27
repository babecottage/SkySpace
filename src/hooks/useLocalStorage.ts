import { useState } from "react";

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  });
};
