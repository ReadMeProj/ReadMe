// Toggle value.
export function toggleArticleLike(articleId, userId) {
  const articleID = articleId;
  const likeRequest = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch(window.$name + "/like/id=" + articleID, likeRequest);
}

export function toggleArticleFavorite(articleId, userId) {
  const articleID = articleId;
  const favRequest = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch(window.$name + "/fav/id=" + articleID, favRequest);
}

// Check value.
export function isUserLoggedIn() {}

export function isArticleLiked(articleID, userID) {
  return false;
} //For each user we should save an array of article IDs of the articles the user liked. Same for favorites.

// Get data (need 'this' as parameter).
export function getArticles(theState) {
  // GET request using fetch with set headers
  fetch(window.$name + "/getArticles")
    .then((response) => response.json())
    .then((response) => response["Data"])
    .then((response) => theState.setState({ articlesData: response }));
}

export function getFavoriteArticles(theState, userID) {
  // GET request using fetch with set headers
  fetch(window.$name + "/getArticles")
    .then((response) => response.json())
    .then((response) => response["Data"])
    .then((response) => theState.setState({ articlesData: response }));
}

export function getUsers(theState) {
  // GET request using fetch with set headers
  fetch(window.$name + "/getUsers")
    .then((response) => response.json())
    .then((response) => response["Data"]) //TODO -FIX
    .then((response) => theState.setState({ articlesData: response }));
}

//More..
export function login(userName, password) {}

export function signUp(userName, password) {}

export function addScore(userID, score) {}
