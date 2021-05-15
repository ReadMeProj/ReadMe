import {config} from './config.js'
const axios = require('axios');




export const axiosClient = axios.create({
    baseURL: `${config.host}:${config['db-port']}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.response.use(
    (response)=> {
        console.log("Got this response from api");
        console.log(response);
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 404){
            console.error("Entity Not found");
        }
        else if(error.response && error.response.status === 401){
            console.error("You are not authorized, try to login");
        }
        else if(error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        console.log(error);
        return Promise.reject(error.message);
    }
)

axiosClient.interceptors.request.use(
    request => {
        console.log(`About to call api endpoint with request`);
        console.log(request);
        return request;
    },
    error => {
        console.log("Something went wrong with request");
        console.log(error);
        return Promise.reject(error);
    }
)