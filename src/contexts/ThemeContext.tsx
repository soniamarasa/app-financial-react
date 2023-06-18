import React from 'react';
import { getTheme, defaultTheme } from '../helpers/Theme';
import { ITheme } from '../interfaces/ITheme';

export const ThemeContext = React.createContext({
  setTheme: (() => {}) as React.Dispatch<React.SetStateAction<ITheme>>,
  theme: {} as ITheme,
});

export const ThemeStorage = ({ children }:{children: any}) => {
  const [theme, setTheme] = React.useState(getTheme() || defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
