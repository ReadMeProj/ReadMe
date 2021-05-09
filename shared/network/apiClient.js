import {config} from './config.js'
const axios = require('axios');
import 'regenerator-runtime/runtime'



export const axiosClient = axios.create({
    baseURL: `${config.host}:${config['db-port']}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.response.use(
    (response)=> {
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 404){
            console.error("Article Not found");
        }
        else if(error.response && error.response.status === 401){
            console.error("You are not authorized");
        }
        else if(error.response && error.response.data) {
            return Promise.reject(error.response.data)
        }
        console.log(error);
        return Promise.reject(error.message);
    }
)