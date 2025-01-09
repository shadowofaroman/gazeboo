import React, { createContext, useState, useContext } from "react";

// Create ThemeContext
const ThemeContext = createContext();

// ThemeProvider to manage the theme state
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage light/dark mode

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for accessing ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
