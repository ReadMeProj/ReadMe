const {config} = require('./config/prodConfig');
const axios = require('axios');
import 'regenerator-runtime/runtime'

const axiosClient = axios.create({
    baseUrl: config['db-host'],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        let res = error.response;
        console.error(`Looks like there was a problem. Status code: ${res.status}`);
        return Promise.reject;
    }
)

export default {
    axiosClient
};