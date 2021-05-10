import {axiosClient} from '../apiClient.js';
import {config} from '../config.js';
import utf8 from 'utf8';




export function getArticle(id) {
    id = utf8.encode(id);
    console.log(`about to call getArticle for : ${id}`);
    return axiosClient.get(`${config["getArticlePath"]}/${id}`);
}

export function getArticles() {
    console.log(axiosClient);
    return axiosClient.get(`${config["getArticlesPath"]}`);
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