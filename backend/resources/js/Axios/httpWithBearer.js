
import http from "./http";
import {getAuthToken} from "../Services/authTokensService";

const httpWithBearer =()=>http.create({
    headers:{
        'X-Request-With':'XMLHttpRequest',
        'Authorization': `Bearer ${getAuthToken()}`
    },
    withCredentials:true
});
export default httpWithBearer
