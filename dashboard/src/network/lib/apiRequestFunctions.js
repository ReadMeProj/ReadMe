import { axiosClient } from "../apiClient.js";
import { config } from "../config.js";

/*
      Function the Dashboard will use to handle the requests and answers in the db by talking with the api.
      An interaction with the api that returns a response will return a promise. 
      It's the code responsibility to catch it and know what the response looks like.
  */
// const userId = window.localStorage.getItem("UserId");

export async function getRequestsForArticle(articleId) {
  if (!articleId)
    console.log("No article id argument was given for getRequests()!");
  return axiosClient.get(
    `${config["getRequestsByArticlePath"] + "/" + articleId}`
  );
}

export async function getRequestsForUser() {
  const userId = window.localStorage.getItem("UserId");
  if (!userId) console.log("No user id argument was given for getRequests()!");
  return axiosClient.get(`${config["getRequestsByUserPath"] + "/" + userId}`);
}

export async function getRequestById(requestId) {
  if (!requestId)
    console.log("No request id argument was given for getRequestsById()!");
  return axiosClient.get(`${config["getRequestByIdPath"] + "/" + requestId}`);
}

export async function submitAnswer(requestId, content) {
  const userId = window.localStorage.getItem("UserId");
  return axiosClient.put(`${config["newAnswerPath"]}`, {
    requestid: requestId,
    userid: userId,
    date: Date.now(),
    content: content,
  });
}

export async function submitQuestion(
  articleId,
  content,
  articlename,
  articleurl
) {
  const userId = window.localStorage.getItem("UserId");
  return axiosClient.put(`${config["newRequestPath"]}`, {
    requestedby: userId,
    articleid: articleId,
    articlename: articlename,
    articleurl: articleurl,
    date: Date.now(),
    content: content,
  });
}

export async function getAnswersByRequest(requestId) {
  if (!requestId)
    console.log("No request id argument was given for getRequests()!");
  return axiosClient.get(`/api/all/answer/requestid/${requestId}`); //todo
}

export async function getAnswerById(answerId) {
  return axiosClient.get(`${config["getAnswerById"] + "/" + answerId}`);
}
