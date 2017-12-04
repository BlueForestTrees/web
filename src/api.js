const req = require('request-promise-lite');
const baseUrl = window.location.href;
const api = {};

const url = (path) => {
    return baseUrl + path;
};

const options = (body) => {
    return {body: body, json: true};
};

const get = (path) => {
    return req.get(url(path), {json: true});
};

const post = (path, body) => {
    return req.post(url(path), options(body));
};

const del = (path) => {
    return req.del(url(path));
};


api.all = () => {
    return get('api/all');
};

api.purge = () => {
    return get('adminapi/purge');
};

api.get = (_id, qt, unit) => {
    if (unit)
        return get(`api/trunk/${_id}/${qt}/${unit}`);
    else if (qt)
        return get(`api/trunk/${_id}/${qt}`);
    else
        return get(`api/trunk/${_id}`);
};

api.create = (trunk) => {
    return post('api/trunk', trunk);
};

api.del = (trunkId) => {
    return del(`api/trunk/${trunkId}`);
};

api.link = (link) => {
    return post('api/root', link);
};

api.unlink = (trunkId, rootId) => {
    return del(`api/root/${trunkId}/${rootId}`);
};

api.search = (namepart) => {
    return get(`api/search/${namepart}`);
};

module.exports = api;