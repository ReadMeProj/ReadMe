import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
    Function the Dashboard will use to handle the users of the app by talking with the api.
    An interaction with the api that returns a response will return a promise. 
    It's the code responsibility to catch it and know what the response looks like.
*/

/// Check if the current session has a valid token.
export function isLoggedIn() {
  const loggedInUser = localStorage.getItem("UserId");
  const loggedInToken = localStorage.getItem("Token");
  return loggedInUser != null && loggedInToken != null;
}

/// Send a POST request with the user cardinals to get a session token.
export async function login(userName, password) {
  return axiosClient.post(`${config.loginPath}`, {
    Username: userName,
    password: password,
  });
}

/// Send a POST request to log the user out.
export async function logout(token, username) {
  if (token && username) {
    localStorage.clear();
    window.location.href = "/";
    return;
  } else {
    console.error(
      `Got illegal values ${token} ${username} expected to get token: sessionToken ,userName: currentUserName`
    );
    return Promise.reject(`Illegal input`);
  }
}

/// Get user by userId in the localStorage.
export async function getUserById() {
  var userName = window.localStorage.getItem("Username");
  var userId = window.localStorage.getItem("UserId");
  var token = window.localStorage.getItem("Token");
  let headers = {
    headers: {
      Token: token,
      Username: userName,
    },
  };
  return axiosClient.get(`${config["getUserPath"] + "/" + userId}`, headers);
}

export async function getUsernameById(userId) {
  var userName = window.localStorage.getItem("Username");
  var token = window.localStorage.getItem("Token");
  let headers = {
    headers: {
      Token: token,
      Username: userName,
    },
  };
  var response = await axiosClient.get(
    `${config["getUserPath"] + "/" + userId}`,
    headers
  );
  if (response.data["Error"] == null) return response.data["Data"].username;
  return null;
}

export async function register(registerJson) {
  return axiosClient.put(`${config.newUserPath}`, registerJson);
}
