import {getAuthToken} from "./AuthTokenService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import {Navigate,Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";

const GuestGuard = () => {
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
    },[])
    if (!loaded){
        return <Loader/>
    }
    return !isAutheticated? <Outlet/>: <Navigate to='profile'/>
}
export default GuestGuard