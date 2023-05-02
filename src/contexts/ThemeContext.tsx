import React from 'react';
import { getTheme, defaultTheme } from '../helpers/Theme';
import { ITheme } from '../interfaces/ITheme';

export const ThemeContext = React.createContext<ITheme | undefined>(undefined);

export const ThemeStorage = ({ children }) => {
  const [theme, setTheme] = React.useState(getTheme() || defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
