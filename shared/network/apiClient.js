const {config} = require('./config');
const axios = require('axios');
import 'regenerator-runtime/runtime'

const axiosClient = axios.create({
    baseUrl: `${config['host']}:${config['db-port']}`,
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
        if(res.status == 401){
            window.location.href = `${config['host']}:${config['dashboard-port']}/${config['loginPath']}`
        }
        console.error(`Looks like there was a problem. Status code: ${res.status}`);
        return Promise.reject;
    }
)

export default {
    axiosClient
};