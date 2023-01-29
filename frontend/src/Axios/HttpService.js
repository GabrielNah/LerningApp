
import ApiRequest from "./AxiosInstance";
import {getAuthToken} from "../Services/AuthTokenService";
const actionNotAuthorizedEvent =(eventDetails)=>new CustomEvent('notAuthorizedEvent', eventDetails);



const http=ApiRequest.create({
    headers:{
        'X-Request-With':'XMLHttpRequest',
        'Authorization': 'Bearer '+getAuthToken()
    },
})
const onRejected=(error)=>{
    if (error?.response?.status===403){
        window.dispatchEvent(actionNotAuthorizedEvent({ detail: { message:error?.response?.data?.message}}))
        return Promise.reject(error)
    }
}
http.interceptors.response.use((response)=>{
    return response;
},onRejected)
export default function(){
    return  http

}