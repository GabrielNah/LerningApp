import axios from "axios";
const ApiRequest = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers:{
      'X-Request-With':'XMLHttpRequest'
    },
    withCredentials:true
});
const onRequest = (config) => {
    if ((
            config.method == 'post' ||
            config.method == 'put' ||
            config.method == 'delete'||
            config.method == 'patch'
        ) &&
        !getCookie('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return axios.get('http://localhost:8000/sanctum/csrf-cookie');
}

ApiRequest.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
ApiRequest.interceptors.request.use(onRequest, (e)=>Promise.reject(e));

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
export default ApiRequest;