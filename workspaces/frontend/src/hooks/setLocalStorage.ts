export const setLocalStorage = () => {
  const setEntryLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getLocalStorageKey = (key: string) => {
    return localStorage.getItem(key);
  };
  return { setEntryLocalStorage, getLocalStorageKey };
};
