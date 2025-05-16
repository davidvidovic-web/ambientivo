import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LanguageSwitcher.css"; // Import your CSS file for styling

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Store the new language in localStorage
    localStorage.setItem("i18nextLng", lng);

    // Reload current route with new language
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="language-switcher">
      <Link
        className={`nav__link ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Link>
      <Link
        className={`nav__link ${i18n.language === "fr" ? "active" : ""}`}
        onClick={() => changeLanguage("fr")}
      >
        FR
      </Link>
    </div>
  );
}

export default LanguageSwitcher;
