import root from 'window-or-global'
import req from 'request-promise-lite';

const baseUrl = root.location ? root.location.href : 'tests/';
const url = (path) => baseUrl + path;

export const get = (path, reqOpts) => req.get(url(path), {...reqOpts, json: true});
export const post = (path, body, reqOpts) => req.post(url(path), {body, ...reqOpts, json: true});
export const del = (path, reqOpts) => req.del(url(path), {...reqOpts, json: true});
export const put = (path, body, reqOpts) => req.put(url(path), {body, ...reqOpts, json: true});