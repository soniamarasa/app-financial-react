export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) as string);
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
