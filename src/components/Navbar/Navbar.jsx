import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewsExplorerLogoWhite from "../../images/NewsExplorerLogo.svg";
import NewsExplorerLogoBlack from "../../images/NewsExplorerLogo-black.svg";
import logoutWhite from "../../images/logout-white.svg";
import logoutBlack from "../../images/logout-black.svg";
import menuWhite from "../../images/sandwhich-white.svg";
import menuBlack from "../../images/sandwhich-black.svg";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Navbar({ handleOpenLoginModal, isLoggedIn, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const isProfile = location.pathname === "/saved-articles";
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <>
      <nav className={`navbar ${isProfile ? "profile" : "home"}`}>
        <Link to="/" className="navbar__logo-link">
          <img
            src={isProfile ? NewsExplorerLogoBlack : NewsExplorerLogoWhite}
            alt="NewsExplorer Logo"
            className="navbar__logo"
          />
        </Link>
        <ul className="navbar__list">
          <li
            className={`navbar__link-cell ${isProfile ? "profile" : "home"} home-link`}
          >
            <Link
              className={`navbar__link ${isProfile ? "profile" : "home"}`}
              to="/"
            >
              Home
            </Link>
            <div className="navbar__link-cell__border"></div>
          </li>
          {isLoggedIn && (
            <li
              className={`navbar__link-cell ${isProfile ? "profile" : "home"} saved-articles-link`}
            >
              <Link
                className={`navbar__link ${isProfile ? "profile" : "home"}`}
                to="/saved-articles"
              >
                Saved Articles
              </Link>
              <div className="navbar__link-cell__border"></div>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <button
                className="navbar__login-button"
                onClick={handleOpenLoginModal}
              >
                Sign in
              </button>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                className={`navbar__logout-button ${isProfile ? "profile" : "home"}`}
                onClick={handleLogout}
              >
                <p className="navbar__logout-name">{currentUser?.name}</p>
                <img
                  className="navbar__logout-icon"
                  src={isProfile ? logoutBlack : logoutWhite}
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
      <nav
        className={`navbar-iphone__container ${menuClicked ? `open` : ``} ${isProfile ? "profile" : ""}`}
      >
        <div className={`navbar-iphone__top ${isProfile ? "profile" : ""}`}>
          <Link to="/" className="navbar__logo-link">
            <img
              src={isProfile ? NewsExplorerLogoBlack : NewsExplorerLogoWhite}
              alt="NewsExplorer Logo"
              className="navbar__logo"
            />
          </Link>
          {menuClicked ? (
            <button
              className={`navbar__close-button ${isProfile ? "profile" : ""}`}
              onClick={() => setMenuClicked(!menuClicked)}
            ></button>
          ) : (
            <button
              className="navbar__menu-button"
              onClick={() => setMenuClicked(!menuClicked)}
            >
              <img
                src={isProfile ? menuBlack : menuWhite}
                alt="Click for Menu"
                className="navbar__menu-button-icon"
              />
            </button>
          )}
        </div>
        {menuClicked && (
          <div
            className={`navbar-iphone__bottom ${isProfile ? "profile" : ""}`}
          >
            <Link
              className={`navbar__link ${isProfile ? "profile" : "home"}`}
              to="/"
              onClick={() => setMenuClicked(!menuClicked)}
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link
                className={`navbar__link ${isProfile ? "profile" : "home"}`}
                to="/saved-articles"
                onClick={() => setMenuClicked(!menuClicked)}
              >
                Saved Articles
              </Link>
            )}
            {!isLoggedIn && (
              <button
                className="navbar__login-button"
                onClick={() => {
                  handleOpenLoginModal();
                  setMenuClicked(!menuClicked);
                }}
              >
                Sign in
              </button>
            )}
            {isLoggedIn && (
              <button
                className={`navbar__logout-button ${isProfile ? "profile" : "home"}`}
                onClick={() => {
                  handleLogout();
                  setMenuClicked(!menuClicked);
                }}
              >
                <p className="navbar__logout-name">{currentUser?.name}</p>
                <img
                  className="navbar__logout-icon"
                  src={isProfile ? logoutBlack : logoutWhite}
                />
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

/*<nav className="navbar-iphone__container">
        <div className="navbar-iphone-top">
          <Link to="/" className="navbar__logo-link">
            <img
              src={isProfile ? NewsExplorerLogoBlack : NewsExplorerLogoWhite}
              alt="NewsExplorer Logo"
              className="navbar__logo"
            />
          </Link>
          {menuClicked ? (
            <button
              className="navbar__close-button"
              onClick={() => setMenuClicked(!menuClicked)}
            ></button>
          ) : (
            <button
              className="navbar__menu-button"
              onClick={() => setMenuClicked(!menuClicked)}
            >
              <img
                src={isProfile ? menuBlack : menuWhite}
                alt="Click for Menu"
                className="navbar__menu-button-icon"
              />
            </button>
          )}
          <div className="navbar-iphone__botton"></div>
        </div>
      </nav>*/
