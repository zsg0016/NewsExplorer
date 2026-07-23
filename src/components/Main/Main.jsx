import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import { useEffect, useState } from "react";

function Main({ articles, saveArticle, loggedIn, onDelete }) {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [firstRowArticles, setFirstRowArticles] = useState([]);

  useEffect(() => {
    setShowMoreBtn(articles.length > 3);
    setFirstRowArticles(articles.slice(0, 3));
  }, [articles]);
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      {
        <NewsCardList
          articles={firstRowArticles}
          onSave={saveArticle}
          isLoggedIn={loggedIn}
          onDelete={onDelete}
        />
      }
      {!showMoreBtn && (
        <NewsCardList
          articles={articles}
          onSave={saveArticle}
          isLoggedIn={loggedIn}
          onDelete={onDelete}
        />
      )}
      {showMoreBtn && (
        <button
          className="main__more-button"
          onClick={() => setShowMoreBtn(false)}
        >
          Show more
        </button>
      )}
    </main>
  );
}

export default Main;

//{isLoading && <Preloader text="Searching for news..." />}
