const {axiosClient} = require('../apiClient');
const config = require('../config/prodConfig');


export function getArticle(id){
    id = encodeURI(id);
    return axiosClient.get(`${config["getArticlePath"]}/${id}`);
}

export function getArticles(){
    return axiosClient.get(`${config["getArticlesPath"]}`);
}

export function newArticle(articleData){
    if(articleData["id"]){
        return axiosClient.put(`${config["newArticlePath"]}` , JSON.stringify(articleData));
    }
}

export function updateUser(articleData){
    if(articleData["id"]){
        return axiosClient.post(`${config["updateArticlePath"]}` , Json.stringify(articleData))
    }
}