
import ApiRequest from "./AxiosInstance";
import {getAuthToken} from "../Services/AuthTokenService";

export default function(){
    return ApiRequest.create({
        headers:{
            'X-Request-With':'XMLHttpRequest',
            'Authorization': 'Bearer '+getAuthToken()
        },
    })
}