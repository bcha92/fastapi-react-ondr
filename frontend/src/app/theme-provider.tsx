"use client"; // Dark/Light Layout and EN/FR Language Mode
import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext({});
// const mode =
//   typeof window !== undefined &&
//   window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";

const defaultLang =
  navigator.languages.includes("fr-ca") ||
  navigator.languages.includes("fr-fr") ||
  navigator.languages.includes("fr")
    ? "fr"
    : "en";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState(defaultLang);
  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");
  const toggleLang = () => (lang === "fr" ? setLang("en") : setLang("fr"));
  return (
    <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  );
}
