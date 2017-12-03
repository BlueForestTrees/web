const req = require('request-promise-lite');
const baseUrl = window.location.href;
const api = {};
const url = (path) => {
    return baseUrl + path;
};
const get = (path) => {
    return req.get(url(path), {json: true});
};




api.headers = () => {
    return get('api/headers');
};



module.exports = api;