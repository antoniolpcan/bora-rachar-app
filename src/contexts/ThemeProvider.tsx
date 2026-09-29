import { useState, useEffect, type ReactNode } from 'react';
import { themes, type ThemeName, getThemeStyle } from '@/theme/theme';
import { ThemeContext } from '@/contexts/ThemeContext';

const THEME_STORAGE_KEY = 'borarachar-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved && saved in themes) ? (saved as ThemeName) : 'sepia';
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const themeStyle = getThemeStyle(themes[theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}
