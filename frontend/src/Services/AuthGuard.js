import {getAuthToken} from "./AuthTokenService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import {Navigate,Outlet} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Loader from "../components/Loader";

const AuthGuard = () => {
    console.log('runs')
    let [isAutheticated,setIsAutheticated]=useState(false);
    let [loaded,setLoaded]=useState(false);
    let {fetchUser,user}=useAuthContext();
    const checkAuthentication=useCallback(async ()=>{
        if (getAuthToken()){
            if (await fetchUser()){
                return true;
            }else{
                return  false
            }
        }
    },[isAutheticated])
    useEffect(  ()=>{
        if (!isAutheticated){
            checkAuthentication().then(r=>{
                if (r){
                    setIsAutheticated(true)
                }else {
                    setIsAutheticated(false)
                }
            })
                .catch(e=>setIsAutheticated(false))
                .finally(()=>setLoaded(true))
        }

    },[isAutheticated])

    return loaded ? isAutheticated?
          <Outlet/>
        : <Navigate to='login'/>
        :<Loader/>
}
export default AuthGuard