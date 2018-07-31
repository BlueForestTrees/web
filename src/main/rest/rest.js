import root from 'window-or-global'
import req from 'request-promise-lite'
import {ACCESS_TOKEN_KEY} from "../const/headers"
import {getAccessToken} from "./auth"

const baseUrl = root.location ? root.location.origin : 'tests/'
export const url = (path) => baseUrl + path

/**
 *
 * @param param _ids
 * @param values [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
export const paramsOf = (param, values) => {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        arr.push(`${param}=${values[i]}`)
    }
    return arr.join("&")
}

export const get = (path, reqOpts) => req.get(url(path), {...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}})
export const post = (path, body, reqOpts) => req.post(url(path), {body, ...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}})
export const del = (path, reqOpts) => req.del(url(path), {...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}})
export const put = (path, body, reqOpts) => req.put(url(path), {body, ...reqOpts, json: true, headers: {[ACCESS_TOKEN_KEY]: getAccessToken()}})