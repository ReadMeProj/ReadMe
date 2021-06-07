import {axiosClient} from '../apiClient.js'
import {config} from '../config.js'


export function register(registerJSon){
    return axiosClient.put(`${config.newUserPath}`, registerJSon).then(res =>{
        return res.data.Data;
    });
}

