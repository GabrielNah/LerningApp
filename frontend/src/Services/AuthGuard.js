import {getAuthToken} from "./AuthTokenService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";

const AuthGuard = ({children}) => {
    let [isAutheticated,setIsAutheticated]=useState(true);
    let {fetchUser}=useAuthContext();
    const checkAuthentication=async ()=>{
        if (getAuthToken()){
            if (await fetchUser()){
                setIsAutheticated(true)
            }else{
                setIsAutheticated(false)
            }
        }
    }
    useEffect( ()=>{
        // checkAuthentication()
    })
    if (isAutheticated){
        return children;
    }
    return (<Navigate to="/login"/>);
}
export default AuthGuard