import {useCookies} from "vue3-cookies";
const {cookies}=useCookies();
export function setCookie(key,value){
    cookies.set(key,value)
}
export function getCookie(key){
   return  cookies.get(key)
}
export function removeCookie(key){
    cookies.remove(key)
}
