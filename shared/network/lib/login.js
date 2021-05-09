import {axiosClient} from '../apiClient.js'
import {config} from '../config.js'


export function login(credentials){
    return axiosClient.post()
}

export function logout(credentials){
    return axiosClient.post()
}