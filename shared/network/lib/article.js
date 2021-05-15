import {axiosClient} from '../apiClient.js';
import {config} from '../config.js';


// Example Json:
// {token:"12233" , userId: "DoronKopit"} 
export function getArticle(articleId , isUserTriggered=true, tokenAndUserIdJson={"userId" : "defaultId", "token": "defualtToken"}) {
    articleId = encodeURIComponent(articleId);
    let callConfig = {
        headers: {
            'Token': isUserTriggered ? tokenAndUserIdJson.token : config.powerUserToken,
            'UserId': isUserTriggered ?  tokenAndUserIdJson.userId : config.powerUserId
        }
    }
    return axiosClient.get(`${config["getArticlePath"]}/${articleId}` , callConfig);
}

export function getArticles() {
    return axiosClient.get(`${config["getArticlesPath"]}`);
}

export function newArticle(articleData) {
    if (articleData["id"]) {
        return axiosClient.put(`${config["newArticlePath"]}`, JSON.stringify(articleData));
    }
}

export function updateArticle(articleData) {
    if (articleData["id"]) {
        return axiosClient.post(`${config["updateArticlePath"]}`, Json.stringify(articleData))
    }
}