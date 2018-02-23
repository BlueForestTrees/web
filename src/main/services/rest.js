import api from './api'

export default {
    //TANK
    getTank: (qt, unit, _id) => api.get(`api/tank/${qt}/${unit}/${_id}`),

    //ROOT
    getUnquantifiedRoots: (_id) => api.get(`api/root/${_id}`),
    getQuantifiedRoots: (qt, unit, _id) => api.get(`api/root/${qt}/${unit}/${_id}`),
    putRoot: (trunk, root) => api.put(`api/root`, {trunk, root}),
    postRoot: (trunkId, rootId) => api.post(`api/root`, {trunk: {_id: trunkId}, root: {_id: rootId}}),
    deleteRoot: (treeId, rootId) => api.del(`api/root/${treeId}/${rootId}`),

    //FACETS
    getQuantifiedFacets: (qt, unit, _id) => api.get(`api/facet/${qt}/${unit}/${_id}`),
    getFacets: _id => api.get(`api/facet/${_id}`),
    deleteFacets: (treeId, facetIds) => api.post('api/facet/deletion', {treeId, facetIds}),
    addFacet: (treeId, facet) => api.post(`api/facet/${treeId}`, {facet}),

    //IMPACTS
    getImpacts: _id => api.get(`api/impact/${_id}`),
    deleteImpacts: (treeId, impactIds) => api.post('api/impact/deletion', {treeId, impactIds}),
    addImpact: (treeId, impact) => api.post(`api/impact/${treeId}`, {impact}),

    //TRUNKS
    search: name => api.get(`api/trunks?q=${name}`),

    //TRUNK
    createTrunk: trunk => api.post('api/trunk', trunk),
    deleteTrunk: trunkId => api.del(`api/trunk/${trunkId}`),
    cloneTrunk: trunkId => api.post(`api/trunk?sourceId=${trunkId}`),
    getTrunk: _id => api.get(`api/trunk/${_id}`),
    renameTrunk: (_id, name) => api.put(`api/trunk/${_id}`, {name}),
    upsertQuantity: (treeId, quantity) => api.put(`api/trunk/${treeId}`, {quantity}),

    //GRANDEURS
    grandeurs: () => api.get('api/grandeurs'),

    //FACET ENTRY
    createFacetEntry: facet => api.post('api/facetEntry', facet),
    searchFacetEntry: namepart => api.get(`api/facetEntry?q=${namepart}`),

    //IMPACT ENTRY
    createImpactEntry: impact => api.post('api/impactEntry', impact),
    searchImpactEntry: namepart => api.get(`api/impactEntry?q=${namepart}`)
}