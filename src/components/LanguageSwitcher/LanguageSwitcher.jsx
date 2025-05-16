import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    navigate(location.pathname, { replace: true });
  };

  // Check if language is not set or undefined, default to English
  const isActive = (lang) => {
    if (!i18n.language && lang === "en") return true;
    return i18n.language === lang;
  };

  return (
    <div className="language-switcher">
      <Link
        className={`nav__link ${isActive("en") ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Link>
      <Link
        className={`nav__link ${isActive("fr") ? "active" : ""}`}
        onClick={() => changeLanguage("fr")}
      >
        FR
      </Link>
    </div>
  );
}

export default LanguageSwitcher;
