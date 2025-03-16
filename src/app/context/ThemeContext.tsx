"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextValue {
  toggle: () => void;
  mode: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  
  const [mode, setMode] = useState(storedTheme || "light");

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);


  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
