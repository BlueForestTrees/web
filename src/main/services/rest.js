import api from './api'

export default {
    addFacet: (treeId, facet) => api.post('api/trunk/facet', {treeId, facet}),
    createFacetEntry: facet => api.post('api/facetEntry', facet),
    cancreate: trunk => api.post('api/trunk', trunk),
    del: trunkId => api.del(`api/trunk/${trunkId}`),
    deleteFacets: (treeId, facetIds) => api.post('api/facets/deletions', {treeId, facetIds}),
    get: _id => api.get(`api/trunk/${_id}`),
    getQuantified: (qt, _id) => api.get(`api/trunk/${qt}/${_id}`),
    link: link => api.post('api/root', link),
    qtUnit: qtUnit => api.post('api/qtunit', qtUnit),
    searchFacetEntry: namepart => api.get(`api/facetEntries?q=${namepart}`),
    search: name => api.get(`api/trunks?q=${name}`),
    upsertPrice: (treeId, price) => api.post(`api/trunk/price`, {treeId, price}),
    upsertQuantity: (treeId, quantity) => api.post(`api/trunk/quantity`, {treeId, quantity}),
    grandeurs: () => api.get('api/grandeurs')
}