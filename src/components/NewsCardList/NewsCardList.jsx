import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";
function NewsCardList({ articles, onSave, onDelete, isLoggedIn }) {
  return (
    <div className="list__container">
      <ul className="card__list">
        {articles.map((article) => {
          return (
            <NewsCard
              article={article}
              key={article.id}
              onSave={onSave}
              onDelete={onDelete}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default NewsCardList;
