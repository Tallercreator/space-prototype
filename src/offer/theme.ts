import * as React from "react";

export type Theme = "light" | "dark";
const KEY = "offer-theme";

function readInitial(): Theme {
  const fromUrl = new URLSearchParams(window.location.search).get("theme");
  if (fromUrl === "dark" || fromUrl === "light") return fromUrl;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* приватный режим */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Тема прототипа: класс `dark` на <html> переключает токены кита.
 * Источник по приоритету: ?theme=dark|light → localStorage → системная настройка.
 */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const initial = readInitial();
    apply(initial);
    return initial;
  });
  const toggle = React.useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* приватный режим */
      }
      return next;
    });
  }, []);
  return [theme, toggle];
}
