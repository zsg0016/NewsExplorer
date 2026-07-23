import "./NewsCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function NewsCard({ article, onSave, isLoggedIn, onDelete }) {
  const [saved, setSaved] = useState(false);
  const date = new Date(article.publishedAt);
  const dateString =
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear();
  const isProfile = useLocation().pathname === "/saved-articles";
  const handleClick = () => {
    if (isProfile) {
      onDelete(article.id);
      return;
    }

    setSaved((prevSaved) => {
      const nextSaved = !prevSaved;

      if (nextSaved) {
        onSave?.(article);
      } else {
        onDelete?.(article.id);
      }

      return nextSaved;
    });
  };
  return (
    <li className="card">
      {isProfile ? <p className="card__keyword">{article.keyword}</p> : <></>}
      {isProfile ? (
        <div className="card__button-section">
          <button
            className="card__delete-button"
            onClick={() => onDelete(article.id)}
          ></button>
          <p className="card__hover-text">Remove from saved</p>
        </div>
      ) : (
        <div className="card__button-section">
          <button
            className={`card__bookmark-button ${saved ? "saved" : ""}`}
            disabled={!isLoggedIn}
            onClick={handleClick}
          ></button>
          {!isLoggedIn && (
            <p className="card__hover-text">Sign in to save articles</p>
          )}
        </div>
      )}
      <Link
        className="card__link"
        to={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={article.urlToImage} className="card__image" />
        <div className="card__content">
          <p className="card__date">{dateString}</p>
          <h3 className="card__title">{article.title}</h3>
          <p className="card__description">{article.description}</p>
          <p className="card__source">{article.source.name}</p>
        </div>
      </Link>
    </li>
  );
}

export default NewsCard;
