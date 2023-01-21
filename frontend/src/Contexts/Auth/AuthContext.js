import {createContext, useContext, useState} from "react";
import useAuthActionsService from "../../Services/useAuthActionsService";
import {removeAuthKey, setAuthToken} from "../../Services/AuthTokenService";
const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const {Login,Logout,Register,FetchAuthUser}=useAuthActionsService()

    const login = async ({email,password}) => {
        try{
            let {user,token}=await Login({email,password})
            setAuthToken(token)
            setUser(user)
            return true;
        }catch (e) {
            removeAuthKey();
            setUser(null)
            return e.response?.data?.errors??false
        }
    }

    const register = async ({name,email,password,password_confirmation}) => {
      try{
          let {user,token}=await Register({name,email,password,password_confirmation})
          setAuthToken(token)
          setUser(user)
          return true
      }catch (e) {
          removeAuthKey();
          setUser(null)
          return e.response?.data?.errors??false
      }
    }

    const logout = async () => {
        let success=await Logout()
        if (success){
            removeAuthKey();
            setUser(null);
            return true;
        }
        return false
    }

    const fetchUser=async ()=>{
        try{
            let {user}=await FetchAuthUser()
            setUser(user)
            return true
        }catch (e) {
            setUser(null)
            removeAuthKey()
            return false
        }
    }


    const value={user,logout,login,register,fetchUser};
    return (<AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>)
}

export const useAuthContext=()=>useContext(AuthContext)