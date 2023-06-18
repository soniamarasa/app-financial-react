import { setLocalStorage, getLocalStorage } from './LocalStorage';

export const defaultTheme = 'theme-01';

export const setThemeStorage = (theme: string) => {
  setLocalStorage('theme', theme);
};

export const getTheme = () => {
  return getLocalStorage('theme') || '';
};
