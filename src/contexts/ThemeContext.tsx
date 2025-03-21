"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme, themes } from "@/styles/themes";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (colors: Theme["colors"]) => {
  const root = document.documentElement;
  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--dots", colors.dots);
  root.style.setProperty("--text-primary", colors.text.primary);
  root.style.setProperty("--text-secondary", colors.text.secondary);
  root.style.setProperty("--accent-primary-from", colors.accent.primary.from);
  root.style.setProperty("--accent-primary-to", colors.accent.primary.to);
  root.style.setProperty(
    "--accent-secondary-from",
    colors.accent.secondary.from
  );
  root.style.setProperty("--accent-secondary-via", colors.accent.secondary.via);
  root.style.setProperty("--accent-secondary-to", colors.accent.secondary.to);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--glass-primary", colors.glass.primary);
  root.style.setProperty("--glass-secondary", colors.glass.secondary);
  root.style.setProperty("--glass-tertiary", colors.glass.tertiary);
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(themes.dark);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setThemeState(themes[savedTheme]);
      applyTheme(themes[savedTheme].colors);
    } else {
      applyTheme(themes.dark.colors);
    }
  }, []);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setThemeState(themes[themeName]);
      localStorage.setItem("theme", themeName);
      applyTheme(themes[themeName].colors);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
