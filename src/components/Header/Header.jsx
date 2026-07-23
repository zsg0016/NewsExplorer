import "./Header.css";

import Navbar from "../Navbar/Navbar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useLocation } from "react-router-dom";

function Header({
  searchFunction,
  handleOpenLoginModal,
  isLoggedIn,
  handleLogout,
}) {
  return (
    <header
      className={`header__${useLocation().pathname === "/saved-articles" ? "profile" : "home"}`}
    >
      <Navbar
        handleOpenLoginModal={handleOpenLoginModal}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {useLocation().pathname !== "/saved-articles" && (
        <>
          <div className="header__text">
            <h1 className="header__title">What{`'`}s going on in the world?</h1>
            <p className="header__paragraph">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>
          <SearchBar handleSubmit={searchFunction} />
        </>
      )}
    </header>
  );
}

export default Header;
