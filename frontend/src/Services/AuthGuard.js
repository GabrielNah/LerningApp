import {getAuthToken} from "./AuthTokenService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import {Navigate,Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";

const AuthGuard = () => {
    let [isAutheticated,setIsAutheticated]=useState(false);
    let [loaded,setLoaded]=useState(false);
    let {fetchUser}=useAuthContext();

    useEffect(  ()=>{
        const checkAuthentication=async ()=>{
            if (getAuthToken()){
                if (await fetchUser()){
                    setIsAutheticated(true)
                }else{
                    setIsAutheticated(false)
                }
            }
            setLoaded(true)
        }
        checkAuthentication()
    },[isAutheticated])
    if (!loaded){
       return <Loader/>
    }
    return isAutheticated? <Outlet/>: <Navigate to='login'/>
}
export default AuthGuard