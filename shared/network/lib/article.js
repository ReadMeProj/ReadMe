import axiosClient from '../apiClient';
import config from '../config';
import utf8 from 'utf8';




export function getArticle(id) {
    id = utf8.encode(id);
    console.log(`about to call getArticle for : ${id}`);
    return axiosClient.axiosClient.get(`${config.config["getArticlePath"]}/${id}`);
}

export function getArticles() {
    console.log(axiosClient);
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