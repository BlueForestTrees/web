import api from './api'

export default {
    get:(_id) => api.get(`api/trunk/${_id}`),
    getQuantified:(qt, _id) => api.get(`api/trunk/${qt}/${_id}`),
    cancreate:(trunk) =>  api.post('api/trunk', trunk),
    qtUnit:(qtUnit) =>  api.post('api/qtunit', qtUnit),
    del: (trunkId) =>  api.del(`api/trunk/${trunkId}`),
    search:(name) =>  api.get(`api/trunks?n=${name}`),
    link:(link) =>  api.post('api/root', link),
    addFacet:(treeId, facet) => api.post('api/facet', {treeId,facet})
}