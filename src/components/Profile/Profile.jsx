import React from "react";
import "./Profile.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Profile({ savedArticles, onDelete, isLoggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  const printKeywords = () => {
    const keywords = [
      ...new Set(
        savedArticles.map((article) => {
          return article.keyword;
        }),
      ),
    ];
    let text = "";
    if (keywords.length > 2) {
      for (let i = 0; i < 2; i++) {
        text = text + keywords[i] + ", ";
      }
      text = text + `and ${savedArticles.length - 2} other`;
      return text;
    }
    keywords.forEach((keyword) => {
      text = text + keyword + ", ";
    });
    return keywords.join(", ");
  };

  return (
    <div className="profile__content">
      <div className="profile__text">
        <p className="profile__text-header">Saved articles</p>
        <h2 className="profile__text-username">{`${currentUser.name}, you have ${savedArticles.length} saved articles`}</h2>
        <div className="profile__keywords">
          <p>
            By keywords:{" "}
            <span className="profile__keywords-text">{printKeywords()}</span>
          </p>
        </div>
      </div>
      <NewsCardList
        articles={savedArticles}
        onDelete={onDelete}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
