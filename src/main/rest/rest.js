import root from 'window-or-global'
import req from 'request-promise-lite';
import {ACCESS_TOKEN_KEY} from "../const/others";
import {getAccessToken} from "./auth";

const baseUrl = root.location ? root.location.origin : 'tests/';
const url = (path) => baseUrl + path;

export const get = (path, reqOpts) => req.get(url(path), {...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}});
export const post = (path, body, reqOpts) => req.post(url(path), {body, ...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}});
export const del = (path, reqOpts) => req.del(url(path), {...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}});
export const put = (path, body, reqOpts) => req.put(url(path), {body, ...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}});