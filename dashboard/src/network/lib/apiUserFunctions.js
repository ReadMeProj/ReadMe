import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
    Function the Dashboard will use to handle the users of the app by talking with the api.
    An interaction with the api that returns a response will return a promise. 
    It's the code responsibility to catch it and know what the response looks like.
*/

/// Check if the current session has a valid token.
export async function isLoggedIn() {
  //TODO
  return true;
}

/// Send a POST request with the user cardinals to get a session token.
export async function login(userName, password) {
  return axiosClient.post(`${config.loginPath}`, {
    Username: userName,
    password: password,
  });
}

/// Send a POST request to log the user out.
export async function logout(params) {}

/// Send  PUT request to update user personal info.
export async function updateInfo(params) {}

/// Send PUT request to update user likes.
export async function likeArticle(params) {}

/// Send PUT request to update user points.
export async function addScore(params) {}

/// Get user current point balance.
export async function getPoints(params) {}

/// Add article ID to user's likes.
