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
  const [mode, setMode] = useState<string>("light"); // Default to light theme

  // State to ensure the component is only rendered client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage when the component has mounted
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setMode(storedTheme);
    }

    // Mark as mounted to allow client-side rendering
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update localStorage whenever the mode changes
    if (mounted) {
      localStorage.setItem("theme", mode);
    }
  }, [mode, mounted]);

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Render the component only after it has mounted
  if (!mounted) {
    return null; // Avoid mismatch by not rendering the component before mount
  }

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
