import axios from 'axios';
import { axiosClient } from '../apiClient.js'
import { config } from '../config.js';


export function getUser(userId, isUserTriggered = true, tokenAndUserNameJson = { "userName": "defaultName", "token": "defualtToken" }) {
    userId = encodeURIComponent(userId);
    let callConfig = {
        headers: {
            'Token': isUserTriggered ? tokenAndUserNameJson.token : config.powerUserToken,
            'UserName': isUserTriggered ? tokenAndUserNameJson.userId : config.powerUserName
        }
    }
    return axiosClient.get(`${config["getUserPath"]}/${userId}`, callConfig);
}

export function getUsers() {
    return axiosClient.get(`${config["getUsersPath"]}`);
}

export function newUser(UserData) {
    if (UserData["id"]) {
        return axiosClient.put(`${config["newUserPath"]}`, JSON.stringify(UserData));
    }
}

export function updateUser(UserData) {
    if (UserData["id"]) {
        return axiosClient.post(`${config["updateUserPath"]}`, Json.stringify(UserData))
    }
}

export function toggleUserLike(userId, articleId, isLiked, tokenAndUserNameJson) {
    if (userId && articleId) {
        let callConfig = {
            headers: tokenAndUserNameJson
        };
        let data = {
            "userid": userId,
            "articleid": articleId,
            "date": Date.now()
        };
        if (!isLiked) {
            return axiosClient.put(`${config["newFavoritePath"]}`, data, callConfig)
        }
        else {
            return axiosClient.post(`${config["deleteFavoritePath"]}`, data, callConfig)
        }
    }
}