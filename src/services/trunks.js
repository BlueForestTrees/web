import api from 'api'
import units from 'units'

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

    search: ({qt,unit,name}) => {
        const _qt = qt ? `qt=${qt}&` : ``;
        const _unit = units.lookup(unit) ? `unit=${unit}&` : ``;
        const _name = `name=${name}`;

        return api.get(`api/trunks?` + _qt + _unit + _name);
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