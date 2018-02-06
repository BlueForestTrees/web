import api from './api'

export default {
    //ROOT
    getUnquantifiedRoots: (_id) => api.get(`api/root/${_id}`),
    getQuantifiedRoots: (qt, unit, _id) => api.get(`api/root/${qt}${unit ? '/' + unit : ''}/${_id}`),
    putRoot: (trunk, root) => api.put(`api/root`, {trunk, root}),
    postRoot: (trunkId, rootId) => api.post(`api/root`, {trunk: {_id: trunkId}, root: {_id: rootId}}),
    deleteRoot: (treeId, rootId) => api.del(`api/root/${treeId}/${rootId}`),

    //FACETS
    getFacets: _id => api.get(`api/facet/${_id}`),
    deleteFacets: (treeId, facetIds) => api.post('api/facet/deletion', {treeId, facetIds}),

    //TRUNKS
    search: name => api.get(`api/trunks?q=${name}`),

    //TRUNK
    createTrunk: trunk => api.post('api/trunk', trunk),
    deleteTrunk: trunkId => api.del(`api/trunk/${trunkId}`),
    cloneTrunk: trunkId => api.post(`api/trunk?sourceId=${trunkId}`),
    getTrunk: _id => api.get(`api/trunk/${_id}`),
    renameTrunk: (_id, name) => api.put(`api/trunk/${_id}`, {name}),
    upsertQuantity: (treeId, quantity) => api.put(`api/trunk/${treeId}`, {quantity}),
    addFacet: (treeId, facet) => api.post('api/trunk/facet', {treeId, facet}),

    //DE TOUT
    grandeurs: () => api.get('api/grandeurs'),
    createFacetEntry: facet => api.post('api/facetEntry', facet),
    searchFacetEntry: namepart => api.get(`api/facetEntries?q=${namepart}`)
}