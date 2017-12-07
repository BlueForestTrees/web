import api from 'api'

export default {

    get: (_id, qt, unit) => {
        if (unit)
            return api.get(`api/trunk/${_id}/${qt}/${unit}`);
        else if (qt)
            return api.get(`api/trunk/${_id}/${qt}`);
        else
            return api.get(`api/trunk/${_id}`);
    },

    create: (trunk) => {
        return api.post('api/trunk', trunk);
    },

    del: (trunkId) => {
        return api.del(`api/trunk/${trunkId}`);
    },

    search: (namepart) => {
        return api.get(`api/trunks?q=${namepart}`);
    },

    all: () => {
        return api.get('api/all');
    },

    purge: () => {
        return api.get('api/purge');
    },

    link: (link) => {
        return api.post('api/root', link);
    },

    unlink: (trunkId, rootId) => {
        return api.del(`api/root/${trunkId}/${rootId}`);
    }

}