import api from './api'

export default {
    addFacet: (treeId, facet) => api.post('api/trunk/facet', {treeId, facet}),
    createFacetEntry: facet => api.post('api/facetEntry', facet),
    cancreate: trunk => api.post('api/trunk', trunk),
    deleteTree: trunkId => api.del(`api/trunk/${trunkId}`),
    cloneTree: trunkId => api.post(`api/trunk?sourceId=${trunkId}`),
    deleteFacets: (treeId, facetIds) => api.post('api/facets/deletions', {treeId, facetIds}),
    deleteRessources: (treeId, ressourceIds) => api.post('api/ressources/deletions', {treeId, ressourceIds}),
    get: _id => api.get(`api/trunk/${_id}`),
    getQuantified: (qt, _id) => api.get(`api/trunk/${qt}/${_id}`),
    link: link => api.post('api/root', link),
    qtUnit: qtUnit => api.post('api/qtunit', qtUnit),
    renameTree: (_id,name) => api.put(`api/trunk/${_id}`, {name}),
    searchFacetEntry: namepart => api.get(`api/facetEntries?q=${namepart}`),
    search: name => api.get(`api/trunks?q=${name}`),
    upsertPrice: (treeId, price) => api.post(`api/trunk/price`, {treeId, price}),
    upsertQuantity: (treeId, quantity) => api.post(`api/trunk/quantity`, {treeId, quantity}),
    grandeurs: () => api.get('api/grandeurs')
}