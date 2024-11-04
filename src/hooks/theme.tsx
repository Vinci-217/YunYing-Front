import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({ isDarkMode: false });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log(document.documentElement.getAttribute('data-theme') === 'dark');
  
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);