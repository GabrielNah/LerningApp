import {getCookie} from "../Services/CookieService";

const http = axios.create({
    headers:{
        'X-Request-With':'XMLHttpRequest'
    },
    withCredentials:true
});
const onRequest = (config) => {
    if (config.method!=='get' && config.method!=='options' && !getCsrfCookie()) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}
const getCsrfCookie=()=>{
    return getCookie('XSRF-TOKEN')
}
// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return axios.get('/sanctum/csrf-cookie');
}

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
http.interceptors.request.use(onRequest, (e)=>Promise.reject(e));


export default http;
