import {del, get, post, put} from './rest'

export default {
    //TANK
    getTank: (qt, unit, _id) => get(`api/tank/${qt}/${unit}/${_id}`),

    //BRANCH
    getUnquantifiedBranches: (_id) => get(`api/branch/${_id}`),
    getQuantifiedBranches: (qt, unit, _id) => get(`api/branch/${qt}/${unit}/${_id}`),

    //ROOT
    getUnquantifiedRoots: (_id) => get(`api/root/${_id}`),
    getQuantifiedRoots: (qt, unit, _id) => get(`api/root/${qt}/${unit}/${_id}`),

    //LINK
    postLink: (trunkId, rootId) => post(`api/link`, {trunk: {_id: trunkId}, root: {_id: rootId}}),
    putLink: (trunk, root) => put(`api/link`, {trunk, root}),
    deleteLink: (treeId, rootId) => del(`api/link/${treeId}/${rootId}`),

    //FACETS
    getQuantifiedFacets: (qt, unit, _id) => get(`api/facet/${qt}/${unit}/${_id}`),
    getFacets: _id => get(`api/facet/${_id}`),
    deleteItems: (treeId, facetIds) => post('api/facet/deletion', {treeId, facetIds}),
    addFacet: (trunk, facet) => post(`api/facet`, {trunk, facet}),

    //IMPACTS TANK
    getQuantifiedImpactTank: (qt, unit, _id) => get(`api/impacttank/${qt}/${unit}/${_id}`),

    //IMPACTS
    getQuantifiedImpact: (qt, unit, _id) => get(`api/impact/${qt}/${unit}/${_id}`),
    deleteItems: (treeId, impactIds) => post('api/impact/deletion', {treeId, impactIds}),
    addImpact: (trunk, impact) => post(`api/impact`, {trunk, impact}),

    //TRUNKS
    search: name => get(`api/trunks?q=${name}`),

    //TRUNK
    createTrunk: trunk => post('api/trunk', trunk),
    deleteTrunk: trunkId => del(`api/trunk/${trunkId}`),
    cloneTrunk: trunkId => post(`api/trunk?sourceId=${trunkId}`),
    getTrunk: _id => get(`api/trunk/${_id}`),
    getQuantifiedTrunk: (qt, unit, _id) => get(`api/trunk/${qt}/${unit}/${_id}`),
    renameTrunk: (_id, name) => put(`api/trunk/${_id}`, {name}),
    upsertQuantity: (treeId, quantity) => put(`api/trunk/${treeId}`, {quantity}),

    //GRANDEURS
    grandeurs: () => get('api/grandeurs'),

    //FACET ENTRY
    createFacetEntry: facet => post('api/facetEntry', facet),
    searchFacetEntry: namepart => get(`api/facetEntry?q=${namepart}`),

    //IMPACT ENTRY
    createImpactEntry: impact => post('api/impactEntry', impact),
    searchImpactEntry: namepart => get(`api/impactEntry?q=${namepart}`),

    //FEEDBACK
    sendFeedback: feedback => post(`api/feedback`, feedback),

    //AUTH
    suscribe: ({login, password}) => post(`api/suscribe`, {login, password}),
    login: ({login, password}) => post(`api/auth`, {login, password}, {resolveWithFullResponse: true})
}