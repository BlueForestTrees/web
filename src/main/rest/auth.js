import {ACCESS_TOKEN_KEY} from "../const/headers";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
export const setAccessToken = token => localStorage.setItem(ACCESS_TOKEN_KEY, token);