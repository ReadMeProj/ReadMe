import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

{
  /*
      Function the Dashboard will use to handle the articles in the db by talking with the api.
      An interaction with the api that returns a response will return a promise. 
      It's the code responsibility to catch it and know what the response looks like.
  */
}

const FiltersEnum = Object.freeze({ filter1: 1, filter2: 2, filter3: 3 });

/// Get all articles.
export async function getArticles() {
  return axiosClient.get(`${config["getArticlesPath"]}`);
}

/// Get user liked articles.

/// Get articles by query.

/// Get article by some filter from the filterEnum.

/// Fill info for article that was requested.

/// Remove article request.
