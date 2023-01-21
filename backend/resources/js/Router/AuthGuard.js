import store from "../Store";
import {getAuthToken} from "../Services/authTokensService";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "./routeNames";

export default function (router) {
    router.beforeResolve(async (to,from)=>{
        if (to.meta?.auth){
            if (getAuthToken()){
                let userSet=await store.dispatch('fetchAuthUser')
                if (userSet){
                    return true;
                }
            }
            return {name:LOGIN_ROUTE.name};
        }
        if (!to.meta?.auth){
            if (getAuthToken()){
                let userSet=await store.dispatch('fetchAuthUser')
                if (userSet){
                    return {name:DASHBOARD_ROUTE.name};;
                }
            }
            return true;
        }
    })
}
