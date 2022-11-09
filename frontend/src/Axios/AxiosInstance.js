import axios from "axios";
const ApiRequest = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers:{
      'X-Request-With':'XMLHttpRequest'
    },
    withCredentials:true
});
export default ApiRequest;