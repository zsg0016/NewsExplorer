import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import PopUp from "../PopUp/PopUp.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import Message from "../Message/Message.jsx";
import { search } from "../../utils/NewsApi.js";
import {
  getSavedArticles,
  saveArticle,
  createUser,
  removeArticle,
} from "../../utils/api.js";
import { authorize, checkToken } from "../../utils/auth.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { createId } from "../../utils/helpers.js";
import NotFoundImage from "../../images/not-found.svg";

function App() {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [requestFailed, setRequestFailed] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("jwt") || "";
  });

  const handleCloseModal = () => {
    setActiveModal("");
    setRequestFailed(false);
  };
  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenRegisterCompletionModal = () => setActiveModal("completion");

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setNotFound(false);
    setIsLoading(true);
    search(keyword)
      .then((result) => {
        setArticles(() => {
          return result.articles.map((data) => {
            data.keyword = keyword;
            data.id = createId();
            return data;
          });
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
    console.log("Arrticles after search: ");
    console.log(articles);
  };

  const handleLogin = (input, handleReset) => {
    authorize(input.email, input.password).then((token) => {
      localStorage.setItem("jwt", token);
    });
    setAccessToken(localStorage.getItem("jwt"));
    checkToken(accessToken).then((response) => {
      setCurrentUser(response.data);
    });
    setIsLoggedIn(true);
    getSavedArticles().then((response) => setSavedArticles(response));
    handleReset();
    handleCloseModal();
  };

  const handleRegister = (input, handleReset) => {
    createUser(input).then((response) => {
      console.log(response);
      handleReset();
      handleOpenRegisterCompletionModal();
    });
  };

  const handleSaveArticle = (article) => {
    saveArticle(article)
      .then((response) => {
        setSavedArticles((prevSavedArticles) => {
          return [...prevSavedArticles, response];
        });
      })
      .catch(() => setRequestFailed(false));
    console.log(savedArticles);
  };

  const handleDeleteSavedArticle = (articleId) => {
    removeArticle(articleId)
      .then(() => {
        setSavedArticles((prevSavedArticles) => {
          return prevSavedArticles.filter((data) => data.id !== articleId);
        });
      })
      .catch(() => setRequestFailed(false));
    console.log(savedArticles);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    setRequestFailed(false);
  };

  useEffect(() => {
    setNotFound(articles.length === 0 && keyword !== "");
    console.log("saved article changed");
  }, [articles]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Login
          isOpen={activeModal === "login"}
          handleKeyPress={handleKeyPress}
          onClose={handleCloseModal}
          handleSubmit={handleLogin}
          failed={requestFailed}
          activeModal={activeModal}
          onSwitch={handleOpenRegisterModal}
        />
        <Register
          isOpen={activeModal === "register"}
          handleKeyPress={handleKeyPress}
          onClose={handleCloseModal}
          handleSubmit={handleRegister}
          failed={requestFailed}
          activeModal={activeModal}
          onSwitch={handleOpenLoginModal}
        />
        <PopUp
          isOpen={activeModal === "completion"}
          handleOpenLoginModal={handleOpenLoginModal}
          onClose={handleCloseModal}
        />
        <Header
          searchFunction={handleSearch}
          handleOpenLoginModal={handleOpenLoginModal}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoading && <Preloader text="Searching for news..." />}
                {notFound === true && (
                  <Message
                    title="Nothing found"
                    description="Sorry, but nothing matched 
your search terms."
                    imageUrl={NotFoundImage}
                  />
                )}
                {articles.length !== 0 && (
                  <Main
                    articles={articles}
                    saveArticle={handleSaveArticle}
                    loggedIn={isLoggedIn}
                    onDelete={handleDeleteSavedArticle}
                  />
                )}{" "}
                <About />
              </>
            }
          />
          <Route
            path="/saved-articles"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  savedArticles={savedArticles}
                  onDelete={handleDeleteSavedArticle}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
