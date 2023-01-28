import {getAuthToken} from "./AuthTokenService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import {Navigate,Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";

const AuthGuard = () => {
    let [isAutheticated,setIsAutheticated]=useState(false);
    let [loaded,setLoaded]=useState(false);
    let {fetchUser}=useAuthContext();
    const checkAuthentication=async ()=>{
        if (getAuthToken()){
            if (await fetchUser()){
                return true;
            }else{
                return  false
            }
        }
    }
    useEffect(  ()=>{

        checkAuthentication().then(r=>{
            if (r){
                setIsAutheticated(true)
            }else {
                setIsAutheticated(false)
            }
        })
         .catch(e=>setIsAutheticated(false))
            .finally(()=>setLoaded(true))
    },[])

    return loaded ? isAutheticated? <Outlet/>: <Navigate to='login'/>:<Loader/>
}
export default AuthGuard