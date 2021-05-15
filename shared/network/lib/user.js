import {axiosClient} from '../apiClient.js'
import {config} from '../config.js';


export function getUser(userId, isUserTriggered=true, tokenAndUserIdJson={"userId" : "defaultId", "token": "defualtToken"}){
    userId = encodeURIComponent(userId);
    let callConfig = {
        headers: {
            'Token': isUserTriggered ? tokenAndUserIdJson.token : config.powerUserToken,
            'UserId': isUserTriggered ?  tokenAndUserIdJson.userId : config.powerUserId
        }
    }
    return axiosClient.get(`${config["getUserPath"]}/${userId}`, callConfig);
}

export function getUsers(){
    return axiosClient.get(`${config["getUsersPath"]}`);
}

export function newUser(UserData){
    if(UserData["id"]){
        return axiosClient.put(`${config["newUserPath"]}` , JSON.stringify(UserData));
    }
}

export function updateUser(UserData){
    if(UserData["id"]){
        return axiosClient.post(`${config["updateUserPath"]}` , Json.stringify(UserData))
    }
}