import api from './api'

export default {
    addFacet:(treeId, facet) => api.post('api/facet', {treeId,facet}),
    cancreate:(trunk) =>  api.post('api/trunk', trunk),
    del: (trunkId) =>  api.del(`api/trunk/${trunkId}`),
    get:(_id) => api.get(`api/trunk/${_id}`),
    getQuantified:(qt, _id) => api.get(`api/trunk/${qt}/${_id}`),
    link:(link) =>  api.post('api/root', link),
    qtUnit:(qtUnit) =>  api.post('api/qtunit', qtUnit),
    search:(name) =>  api.get(`api/trunks?n=${name}`),
    upsertPrice:(treeId,price)=> api.post(`api/price`,{treeId,price}),
    upsertQuantity:(treeId,quantity)=> api.post(`api/quantity`,{treeId,quantity}),
    grandeurs:()=>api.get('api/grandeurs')
}