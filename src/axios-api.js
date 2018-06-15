import Axios from 'axios'
import { eventHub } from './eventHub'

function createAxios() {
    const axios = Axios.create({
      baseURL: 'http://localhost:53508/'
    })
    axios.interceptors.request.use(
        conf => {
            eventHub.$emit('before-request');
            return conf;
        },
        error => {
            eventHub.$emit('request-error');
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        response => {
            eventHub.$emit('after-response');
            return response;
        },
        error => {
            eventHub.$emit('response-error');
            return Promise.reject(error);
        }
    );
    return axios;
}

export default createAxios();