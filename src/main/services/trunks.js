import api from './api'
import units from './units'

const get = (_id, qt, unit) => {
    if (unit)
        return api.get(`api/trunk/${_id}/${qt}/${unit}`);
    else if (qt)
        return api.get(`api/trunk/${_id}/${qt}`);
    else
        return api.get(`api/trunk/${_id}`);
};

const create = (trunk) => {
    return api.post('api/trunk', trunk);
};

const del = (trunkId) => {
    return api.del(`api/trunk/${trunkId}`);
};

const search = (name) => {
    return api.get(`api/trunks?n=${name}`);
};

const all = () => {
    return api.get('api/all');
};

const purge = () => {
    return api.post('api/purge');
};

const link = (link) => {
    return api.post('api/root', link);
};

const unlink = (trunkId, rootId) => {
    return api.del(`api/root/${trunkId}/${rootId}`);
};

export default {
    get, create, del, search, all, purge, link, unlink
}