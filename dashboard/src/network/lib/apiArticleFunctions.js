import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
      Function the Dashboard will use to handle the articles in the db by talking with the api.
      An interaction with the api that returns a response will return a promise. 
      It's the code responsibility to catch it and know what the response looks like.
  */

//const FiltersEnum = Object.freeze({ filter1: 1, filter2: 2, filter3: 3 }); //TODO
// const userId = window.localStorage.getItem("UserId");
// const userName = window.localStorage.getItem("Username");
// const token = window.localStorage.getItem("Token");

export async function getRecommendations() {
  const userId = window.localStorage.getItem("UserId");
  var numRecommendations = 20;
  if (userId == null) {
    console.log("No Userid in local storage, can't get recommendations");
    return [];
  }

  return axiosClient.get(
    `${config["recommendationsPath"]}/${userId}/${numRecommendations}`
  );
}

/// Get all articles.
export async function getArticles() {
  return axiosClient.get(`${config["getArticlesPath"]}`);
}

/// Get article by ID.
export async function getArticleById(articleId) {
  const userName = window.localStorage.getItem("Username");
  const token = window.localStorage.getItem("Token");
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
  const userId = window.localStorage.getItem("UserId");
  return axiosClient.get(`${config["getFavoritesByUserPath"] + "/" + userId}`);
}

// Toggle favorite for article
export async function addFav(articleId, date) {
  const userId = window.localStorage.getItem("UserId");
  axiosClient.put(`${config["newFavoritePath"]}`, {
    userid: userId,
    articleid: articleId,
    date: date,
  });
}

export async function removeFav(articleId) {
  const userId = window.localStorage.getItem("UserId");
  return axiosClient.post(`${config["deleteFavoritePath"]}`, {
    articleid: articleId,
    userid: userId,
  });
}

/// Get articles by query.

/// Get article by some filter from the filterEnum.
