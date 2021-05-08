import config from './config'
const axios = require('axios');
import 'regenerator-runtime/runtime'


const axiosClient = axios.create({
    baseUrl: `${config.config.host}:${config.config['db-port']}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});

// axiosClient.interceptors.response.use(
//     function(response){
//         return response;
//     },
//     function(error){
//         let res = error.response;
//         console.error(`Looks like there was a problem. Status code: ${res.status}`);
//         return Promise.reject;
//     }
// )

export default {
    axiosClient
};