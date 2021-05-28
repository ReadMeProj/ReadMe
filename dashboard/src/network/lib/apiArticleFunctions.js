import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
      Function the Dashboard will use to handle the articles in the db by talking with the api.
      An interaction with the api that returns a response will return a promise. 
      It's the code responsibility to catch it and know what the response looks like.
  */

//const FiltersEnum = Object.freeze({ filter1: 1, filter2: 2, filter3: 3 }); //TODO

export async function getRecommendations() {
  var userID = window.localStorage.getItem("UserId");
  var numRecommendations = 20;
  if (userID == null) {
    console.log("No Userid in local storage, can't get recommendations");
    return [];
  }
  
  return axiosClient.get(`${config["recommendationsPath"]}/${userID}/${numRecommendations}`)
}

/// Get all articles.
export async function getArticles() {
  return axiosClient.get(`${config["getArticlesPath"]}`);
}

/// Get article by ID.
export async function getArticleById(articleId) {
  var userName = window.localStorage.getItem("Username");
  var token = window.localStorage.getItem("Token");
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
  var userId = window.localStorage.getItem("UserId");
  return axiosClient.get(`${config["getFavoritesByUserPath"] + "/" + userId}`);
}

/// Fill info for article that was requested.
export async function fillRequest(requestID, articleID, reportJson) {
  var userId = window.localStorage.getItem("UserId");
  var answer = {
    requestid: requestID,
    userid: userId,
    articleid: articleID,
    date: new Date().toLocaleString() + "",
    report: reportJson,
  };
  return axiosClient.put(`${config.newAnswerPath}`, answer);
}

/// Get articles by query.

/// Get article by some filter from the filterEnum.
