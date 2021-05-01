const {config} = require('../public/config/localDev');
const axios = require('axios');


export function getUserById(id){
    const hostUrl = config.db-host;
    return hostUrl + id;
}

export function getUsers(limit){
 
}

export function getArticleById(id){
    const hostUrl = config["db-host"];
    const path = config["getArticlePath"];
    axios.get(`${hostUrl}${path}/${id}`).then(response => {
        console.log(response);
    })
}

export function getArticles(limit){

}

export function newUser(User){

}

export function newArticle(article){
    
}

export function updateUser(){

}

export function updateArticle(){

}
