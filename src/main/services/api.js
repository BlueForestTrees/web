import {baseUrl} from './const';
import req from 'request-promise-lite';

const url = (path) => {
    return baseUrl + path;
};

const options =  (body) => {
    return {body: body, json: true};
};

export default {

    get: (path) => {
        return req.get(url(path), options());
    },

    post: (path, body) => {
        return req.post(url(path), options(body));
    },

    del: (path) => {
        return req.del(url(path));
    }
}