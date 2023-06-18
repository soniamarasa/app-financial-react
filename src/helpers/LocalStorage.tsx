export const setLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) as string);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
