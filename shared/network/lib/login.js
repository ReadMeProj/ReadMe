import {axiosClient} from '../apiClient.js'
import {config} from '../config.js'


export function login(userIdAndPasswordJson){
    return axiosClient.post(`${config.loginPath}`, userIdAndPasswordJson);
}

export function logout(tokenAndIdJson){
    if(tokenAndIdJson && tokenAndIdJson.token && tokenAndIdJson.userId){
        let callConfig = {
            headers: {
                'Token': tokenAndIdJson.token,
                'UserId': tokenAndIdJson.userId
            }
        }
        return axiosClient.post(`${config.logoutPath}` , {}, callConfig);
    }
    else{ 
        console.error(`Got illegal value ${tokenAndIdJson} expected to get {token: sessionToken ,userId: currentUserId}`);
        return Promise.reject(`Illegal input`);
    }
}