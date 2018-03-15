import api from './api'

export default {
    //TANK
    getTank: (qt, unit, _id) => api.get(`api/tank/${qt}/${unit}/${_id}`),

    //BRANCH
    getUnquantifiedBranches: (_id) => api.get(`api/branch/${_id}`),
    getQuantifiedBranches: (qt, unit, _id) => api.get(`api/branch/${qt}/${unit}/${_id}`),

    //ROOT
    getUnquantifiedRoots: (_id) => api.get(`api/root/${_id}`),
    getQuantifiedRoots: (qt, unit, _id) => api.get(`api/root/${qt}/${unit}/${_id}`),

    //LINK
    putLink: (trunk, root) => api.put(`api/link`, {trunk, root}),
    postLink: (trunkId, rootId) => api.post(`api/link`, {trunk: {_id: trunkId}, root: {_id: rootId}}),
    deleteLink: (treeId, rootId) => api.del(`api/link/${treeId}/${rootId}`),

    //FACETS
    getQuantifiedFacets: (qt, unit, _id) => api.get(`api/facet/${qt}/${unit}/${_id}`),
    getFacets: _id => api.get(`api/facet/${_id}`),
    deleteFacets: (treeId, facetIds) => api.post('api/facet/deletion', {treeId, facetIds}),
    addFacet: (trunk, facet) => api.post(`api/facet`, {trunk, facet}),

    //IMPACTS TANK
    getQuantifiedImpactTank: (qt, unit, _id) => api.get(`api/impacttank/${qt}/${unit}/${_id}`),

    //IMPACTS
    deleteImpacts: (treeId, impactIds) => api.post('api/impact/deletion', {treeId, impactIds}),
    addImpact: (trunk, impact) => api.post(`api/impact`, {trunk, impact}),

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