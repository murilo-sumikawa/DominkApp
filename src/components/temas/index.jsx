import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./Temas.module.css";

export default function Temas() {
  const [tema, setTema] = useState(() => {
    try {
      if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
        return "dark";
      }
      return localStorage.getItem("theme");
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    try {
      localStorage.setItem("theme", tema);
    } catch {
      // ignore storage errors
    }
  }, [tema]);

  return (
    <button
      className={styles.toggle}
      onClick={() => setTema((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="alternar tema"
    >
      <span
        className={`${styles.knob} ${tema === "light" ? styles.light : ""}`}
      >
        {tema === "dark" ? <FiSun /> : <FiMoon />}
      </span>
    </button>
  );
}
