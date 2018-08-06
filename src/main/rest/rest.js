import root from 'window-or-global'
import req from 'request-promise-lite'
import {X_ACCESS_TOKEN} from "../const/headers"
import isNil from 'lodash.isnil'
import state from '../store/state'

const baseUrl = root.location ? root.location.origin : 'tests/'
export const url = (path) => baseUrl + path

/**
 *
 * @param param _ids
 * @param values [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
export const arrayOf = (param, values) => {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        arr.push(`${param}=${values[i]}`)
    }
    return arr.join("&")
}

export const paramsOf = params => {
    const keys = Object.keys(params)
    const arr = []
    for (let i = 0; i < keys.length; i++) {
        const rawValue = params[keys[i]]
        if (!isNil(rawValue)) {
            arr.push(Array.isArray(rawValue) ? arrayOf(keys[i], rawValue) : `${keys[i]}=${rawValue}`)
        }
    }
    return "?" + arr.join("&")
}

export const get = (path, reqOpts) => req.get(url(path), {json: true, ...reqOpts})
export const del = (path, reqOpts) => req.del(url(path), {json: true, headers: {[X_ACCESS_TOKEN]: state.token}, ...reqOpts})
export const post = (path, body, reqOpts) => req.post(url(path), {body, json: true, headers: {[X_ACCESS_TOKEN]: state.token}, ...reqOpts})
export const put = (path, body, reqOpts) => req.put(url(path), {body, json: true, headers: {[X_ACCESS_TOKEN]: state.token, ...reqOpts}})

export const upload = (path, formData, reqOpts) => {
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST', url(path), true)

    //Headers
    if (state.token) {
        xhr.setRequestHeader(X_ACCESS_TOKEN, state.token)
    }
    if (reqOpts && reqOpts.headers) {
        Object.keys(reqOpts.headers).forEach(p =>
            xhr.setRequestHeader(p, reqOpts.headers[p])
        )
    }

    // Events
    if (reqOpts && reqOpts.onProgress) {
        xhr.upload.addEventListener('progress', reqOpts.onProgress, false)
    }

    let promise = new Promise((resolve, reject) => {
        xhr.onload = function () {
            xhr.status >= 200 && xhr.status < 400 ? resolve(this.response) : reject(this.response)
        }
        xhr.onerror = event => reject("Une erreur " + event.target.status + " s'est produite")
    })

    // Start upload
    xhr.send(formData)
    return promise
}

