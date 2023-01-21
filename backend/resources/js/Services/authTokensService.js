const AUTH_TOKEN_KEY='_a_t_k+'
export function setAuthToken(token){
    localStorage.setItem(AUTH_TOKEN_KEY,token)
}
export function getAuthToken(){
    return localStorage.getItem(AUTH_TOKEN_KEY)
}
export function clearAuthToken(){
    localStorage.removeItem(AUTH_TOKEN_KEY)
}
