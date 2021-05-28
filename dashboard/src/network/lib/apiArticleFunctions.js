import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
      Function the Dashboard will use to handle the articles in the db by talking with the api.
      An interaction with the api that returns a response will return a promise. 
      It's the code responsibility to catch it and know what the response looks like.
  */

//const FiltersEnum = Object.freeze({ filter1: 1, filter2: 2, filter3: 3 }); //TODO
const userId = window.localStorage.getItem("UserId");
const userName = window.localStorage.getItem("Username");
const token = window.localStorage.getItem("Token");
/// Get all articles.
export async function getArticles() {
  return axiosClient.get(`${config["getArticlesPath"]}`);
}

/// Get article by ID.
export async function getArticleById(articleId) {
  let headers = {
    headers: {
      Token: token,
      Username: userName,
    },
  };

  return axiosClient.get(
    `${config["getArticlePath"] + "/" + articleId}`,
    headers
  );
}

/// Get user liked articles.
export async function getUserFavorites() {
  return axiosClient.get(`${config["getFavoritesByUserPath"] + "/" + userId}`);
}

// Toggle favorite for article
export async function addFav(articleId, date) {
  axiosClient.put(`${config["newFavoritePath"]}`, {
    userid: userId,
    articleid: articleId,
    date: date,
  });
}

/// Get articles by query.

/// Get article by some filter from the filterEnum.
