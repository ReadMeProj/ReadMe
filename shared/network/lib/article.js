import  axiosClient from '../apiClient';
import config from '../config';



export function getArticle(id) {
    id = encodeURI(id);
    return axiosClient.axiosClient.get(`${config.config["getArticlePath"]}/${id}`);
}

export function getArticles() {
    return axiosClient.axiosClient.get(`${config.config["getArticlesPath"]}`);
}

export function newArticle(articleData) {
    if (articleData["id"]) {
        return axiosClient.put(`${config["newArticlePath"]}`, JSON.stringify(articleData));
    }
}

export function updateUser(articleData) {
    if (articleData["id"]) {
        return axiosClient.post(`${config["updateArticlePath"]}`, Json.stringify(articleData))
    }
}