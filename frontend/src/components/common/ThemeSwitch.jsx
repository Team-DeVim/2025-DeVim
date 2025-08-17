import { useEffect } from "react";
import "./ThemeSwitch.css";

const ThemeSwitch = ({ name = "Switch Theme", className = "" }) => {
  // 최초 로드 시 저장된 테마 복원
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const initial = saved === "code" ? "code" : "game";
    root.dataset.theme = initial;
    root.style.colorScheme = initial === "code" ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "code" ? "game" : "code";
    root.dataset.theme = next;
    root.style.colorScheme = next === "code" ? "dark" : "light";
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      className={`switch ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <span className="switch__icon game">☀️</span>
      <span className="switch__icon code">🌜</span>
      <span className="switch__indicator" />
    </button>
  );
};

export default ThemeSwitch;
