import api from './api'

export default {
    addFacet: (treeId, facet) => api.post('api/facet', {treeId, facet}),
    createFacet: facet => api.post('api/facetEntry', facet),
    cancreate: trunk => api.post('api/trunk', trunk),
    del: trunkId => api.del(`api/trunk/${trunkId}`),
    get: _id => api.get(`api/trunk/${_id}`),
    lookupTrunk: name => api.get(`api/trunk?q=${name}`),
    getQuantified: (qt, _id) => api.get(`api/trunk/${qt}/${_id}`),
    link: link => api.post('api/root', link),
    qtUnit: qtUnit => api.post('api/qtunit', qtUnit),
    search: name => api.get(`api/trunks?q=${name}`),
    upsertPrice: (treeId, price) => api.post(`api/trunk/price`, {treeId, price}),
    upsertQuantity: (treeId, quantity) => api.post(`api/trunk/quantity`, {treeId, quantity}),
    grandeurs: () => api.get('api/grandeurs')
}