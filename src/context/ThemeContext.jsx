// src/context/ThemeContext.jsx
import { createContext, useState, useContext } from "react";

// STEP 1: Create the Context object
const ThemeContext = createContext();

// STEP 2: Create the Provider component that holds the state
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// STEP 3: Create a custom hook for easy consumption in child components
export function useTheme() {
  return useContext(ThemeContext);
}
