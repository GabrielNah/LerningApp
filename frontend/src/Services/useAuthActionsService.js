import ApiRequest from "../Axios/AxiosInstance";
import HttpService from "../Axios/HttpService";

export default function () {
    const Login=async ({email,password})=>{
        try{
            let  {data}=await ApiRequest.post('/login',{email,password})
            return data;
        }catch (e) {
            throw e
        }
    }

    const Register=async ({name,email,password,password_confirmation})=>{
        try{
            let  {data}=await ApiRequest.post('/register',{name,email,password,password_confirmation})
            return data;
        }catch (e) {
            throw e
        }
    }

    const FetchAuthUser =async () => {
        try{
            let {data}=await HttpService().post('/me')
            return data;
        }catch (e) {
            return false;
        }

    }

    const Logout = async () => {
        try{
            let {data:{success}}=await HttpService().post('/logout')
            return success;
        }catch (e) {
            return true;
        }
    }

    return  {Login,Logout,Register,FetchAuthUser}

}