import {baseUrl} from '../const/const';
import req from 'request-promise-lite';

const url = (path) => {
    return baseUrl + path;
};

const options =  (body) => {
    return {body: body, json: true};
};

export default {

    get: (path) => req.get(url(path), options()),

    post: (path, body) => req.post(url(path), options(body)),

    del: (path) => req.del(url(path)),

    put: (path,body) => req.put(url(path), options(body))

}