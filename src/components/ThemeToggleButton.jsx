import React, { useState, useEffect, useContext } from "react";
import "./ThemeToggleButton.scss";
import { MailInboxContext } from "../contexts/MailnboxProvider";
import { FaSun } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(MailInboxContext);
  const [isToggled, setIsToggled] = useState(theme === "dark");

  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    toggleTheme();
  };

  return (
    <button
      className={`toggle-button ${isToggled ? "toggled" : ""}`}
      onClick={handleToggle}
    >
      <div className={`icon ${theme === "light" ? "right" : "left"}`}>
        {theme === "light" ? <MdNightlight size={23} /> : <FaSun size={23} />}
      </div>

      <div className="toggle-circle"></div>
    </button>
  );
};

export default ThemeToggleButton;
