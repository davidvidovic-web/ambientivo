import Logo from "../Logo/Logo";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import "./mobileMenu.css";

function MobileMenu() {
  const [isOpen, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const stickyThreshold = 150; // The scroll position to trigger the sticky header
    if (scrollTop >= stickyThreshold) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <nav
      className={`is-open-${isOpen} main-menu nav ${
        isSticky ? "is-sticky" : ""
      }`}
    >
      <div className="inner-menu-wrapper">
        <Logo />
        <div className="mobile-menu">
          <span>Menu</span>
          <Menu
            isOpen={isOpen}
            width={"100%"}
            right
            noOverlay
            customBurgerIcon={<Hamburger toggled={isOpen} toggle={setOpen} />}
            customCrossIcon={<Hamburger toggled={isOpen} toggle={setOpen} />}
          >
            <Logo />
            <ul className="menu-ul nav__list">
              <li className="nav__el">
                <Link className="nav__link" target="_self" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__el">
                <Link className="nav__link" target="_self" to="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li className="nav__el">
                <Link className="nav__link" target="_self" to="/about">
                  About
                </Link>
              </li>
              <li className="nav__el">
                <Link className="nav__link" target="_self" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default MobileMenu;
