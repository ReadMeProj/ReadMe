import {axiosClient} from '../apiClient.js'
import {config} from '../config.js'


export function login(userNameAndPasswordJson){
    return axiosClient.post(`${config.loginPath}`, userNameAndPasswordJson).then(res =>{
        return res.data.Data;
    });
}
export function getUser(userId , isUserTriggered=true, tokenAndUserNameJson={"userName" : "defaultName", "token": "defualtToken"}) {
    let callConfig = {
        headers: {
            'Token': isUserTriggered ? tokenAndUserNameJson.token : config.powerUserToken,
            'UserName': isUserTriggered ?  tokenAndUserNameJson.userName : config.powerUserName
        }
    }
    return axiosClient.get(`${config["getUserPath"]}/${userId}` , callConfig);
}

export function logout(tokenAndIdJson){
    if(tokenAndIdJson && tokenAndIdJson.token && tokenAndIdJson.userName){
        let callConfig = {
            headers: {
                'Token': tokenAndIdJson.token,
                'UserName': tokenAndIdJson.userName
            }
        }
        return axiosClient.post(`${config.logoutPath}` , {}, callConfig);
    }
    else{ 
        console.error(`Got illegal value ${tokenAndIdJson} expected to get {token: sessionToken ,userName: currentUserName}`);
        return Promise.reject(`Illegal input`);
    }
}