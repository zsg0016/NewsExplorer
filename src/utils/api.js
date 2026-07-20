import { savedArticles } from "../utils/constants.js";

export const getSavedArticles = () => {
  return new Promise((resolve) => {
    resolve(savedArticles);
  });
};

export const saveArticle = (article) => {
  return new Promise((resolve) => {
    resolve(article);
  });
};

export const removeArticle = (article) => {
  return new Promise((resolve) => {
    resolve(article);
  });
};

export const createUser = (user) => {
  return new Promise((resolve) => {
    resolve(user);
  });
};
