import {axiosClient} from '../apiClient.js'
import {config} from '../config.js';


export function getUser(id){
    id = encodeURI(id);
    return axiosClient.get(`${config["getUserPath"]}/${id}`);
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