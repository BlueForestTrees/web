import {X_ACCESS_TOKEN} from "../const/headers"

export const getAccessToken = () => localStorage.getItem(X_ACCESS_TOKEN)
export const clearAccessToken = () => localStorage.removeItem(X_ACCESS_TOKEN)
export const setAccessToken = token => localStorage.setItem(X_ACCESS_TOKEN, token)