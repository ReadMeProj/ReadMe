import {axiosClient} from '../apiClient.js';
import {config} from '../config.js';


// Example Json:
// {token:"12233" , userName: "DoronKopit"} 
export function getArticle(articleId , isUserTriggered=true, tokenAndUserNameJson={"userName" : "defaultName", "token": "defualtToken"}) {
    let callConfig = {
        headers: {
            'Token': isUserTriggered ? tokenAndUserNameJson.token : config.powerUserToken,
            'UserName': isUserTriggered ?  tokenAndUserNameJson.userName : config.powerUserName
        }
    }
    return axiosClient.get(`${config["getArticlePath"]}?url=${encodeURIComponent(articleId)}` , callConfig);
}

export function getArticles() {
    return axiosClient.get(`${config["getArticlesPath"]}`);
}

export function getArticleTags(articleData) {
    if (articleData["id"]) {
    return axiosClient.get(`${config["getArticleTagsPath"]}${articleData["id"]}`);
    }
}

export function newArticle(articleData) {
    if (articleData["id"]) {
        return axiosClient.put(`${config["newArticlePath"]}`, JSON.stringify(articleData));
    }
}

export function newReport(articleData) {
    if (articleData["articleid"]) {
        return axiosClient.put(`${config["newReportPath"]}`, JSON.stringify(articleData));
    }
}

export function newRequest(articleData) {
    if (articleData["articleid"]) {
        return axiosClient.put(`${config["newRequestPath"]}`, JSON.stringify(articleData));
    }
}

export function updateArticle(articleData) {
    if (articleData["id"]) {
        return axiosClient.post(`${config["updateArticlePath"]}`, JSON.stringify(articleData))
    }
}

export function updateReport(articleData) {
    if (articleData["articleid"]) {
        return axiosClient.post(`${config["updateReportPath"]}`, JSON.stringify(articleData))
    }
}

export function updateRequest(articleData) {
    if (articleData["articleid"]) {
        return axiosClient.post(`${config["updateRequestPath"]}`, JSON.stringify(articleData))
    }
}

export function sort_by_key(array, key)
{
 return [].slice.call(array).sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
 });
}