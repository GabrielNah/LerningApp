import http from "../../Axios/http";
import {clearAuthToken, setAuthToken} from "../../Services/authTokensService";
import httpWithBearer from "../../Axios/httpWithBearer";

export default {
    state:()=>({
        user:null,
        isAuthenticated:false,
    }),
    getters:{
        authenticatedUser:(state)=>state.user,
        userIsAuthenticated:(state)=>state.isAuthenticated,
    },
    mutations:{
        setUser(state,user){
            state.user=user
        },
        setIsAuthenticated(state,authState){
            state.isAuthenticated=authState
        }
    },
    actions:{
        async login(ctx,credentials){
            try {
                let {data}=await http.post('/login',credentials)
                if (data.token){
                    setAuthToken(data.token)
                }
                if (data.user){
                    ctx.commit('setUser',data.user)
                    ctx.commit('setIsAuthenticated',true)
                }
                return {success:true};
            }catch (e) {
                clearAuthToken();
                ctx.commit('setUser',null)
                ctx.commit('setIsAuthenticated',null)
                if (e?.response?.data?.errors){
                    let errors=e?.response?.data?.errors
                    return {errors,error:true}
                }

            }

        },
        async logout(ctx){
            try {
                let {data:{success}}=await httpWithBearer().post('/logout')
                if (success){
                    clearAuthToken();
                    ctx.commit('setIsAuthenticated',false);
                    ctx.commit('setUser',null)
                    return true
                }
            }catch (e){
                return e;
            }
        }
    }
}
