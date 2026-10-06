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
export function useTheme(forcedTheme?: Theme): [Theme, () => void] {
  const [preference, setPreference] = React.useState<Theme>(readInitial);
  const theme = forcedTheme ?? preference;

  // Synchronize the document before paint; forced themes never overwrite the preference.
  React.useLayoutEffect(() => {
    apply(theme);
  }, [theme]);

  const toggle = React.useCallback(() => {
    if (forcedTheme) return;
    const next: Theme = preference === "dark" ? "light" : "dark";
    setPreference(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* приватный режим */
    }
  }, [forcedTheme, preference]);
  return [theme, toggle];
}
