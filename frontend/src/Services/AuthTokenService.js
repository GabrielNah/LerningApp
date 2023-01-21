const KEY_TO_AUTH_TOKEN='_o=T-k_l'
export function setAuthToken(token){
    localStorage.setItem(KEY_TO_AUTH_TOKEN,token)
}
export function getAuthToken(){
    return localStorage.getItem(KEY_TO_AUTH_TOKEN)
}
export function removeAuthKey(){
    return localStorage.removeItem(KEY_TO_AUTH_TOKEN)
}