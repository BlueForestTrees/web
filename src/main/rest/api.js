import {del, get, arrayOf, post, put, paramsOf, postForm, upload} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"

export default {
    // DIRECT (id qt) (color name) => à stocker. Les get réutilisent le storage
    searchFacetEntry: namepart => get(`/api/facetEntry${paramsOf({q: namepart})}`),
    searchImpactEntry: namepart => get(`/api/impactEntry${paramsOf({q: namepart})}`),
    searchTrunk: ({term, type, aidx, ps}) => get(`/api/trunks${paramsOf({q: term, t: type, aidx, ps})}`),
    //mixin? pour gérer (name color) et (complet)
    getTrunks: _ids => get(`/api/trunk${arrayOf('_ids', _ids)}`),
    getTrunk: _id => get(`/api/trunk/${_id}`),
    //getImpactEntry
    //getFacetEntry
    
    getGrandeurs: () => get('/api/grandeurs'),
    
    
    //peupler les (color name) depuis storage, ou lookup.
    getFacets: _id => get(`/api/facet/${_id}`),
    getImpact: _id => get(`/api/impact/${_id}`),
    getTank: (qt, unit, _id) => get(`/api/tank/${qt}/${unit}/${_id}`),
    getBranches: (_id) => get(`/api/branch/${_id}`),
    getRoots: (_id) => get(`/api/root/${_id}`),
    getQuantifiedImpactTank: (qt, unit, _id) => get(`/api/impacttank/${qt}/${unit}/${_id}`),
    
    
    putLink: ({_id, trunkId, rootId, relativeTo, bqt}) => Promise.all([
        put(`/api/root`, {_id, trunkId, rootId, relativeTo, bqt}),
        put(`/api/branch`, {_id, trunkId: rootId, rootId: trunkId, bqt: 1 / bqt})
    ]),
    postLink: ({_id, trunkId, rootId, relativeTo, bqt}) => Promise.all([
        post(`/api/root`, {_id, trunkId, rootId, relativeTo, bqt}),
        post(`/api/branch`, {_id, trunkId: rootId, branchId: trunkId, bqt: 1 / bqt})
    ]),
    deleteLink: _id => Promise.all([
        del(`/api/root/${_id}`),
        del(`/api/branch/${_id}`)
    ]),
    
    putFacet: (trunk, facet) => post(`/api/facet`, {trunk, facet}),
    putTrunkName: (_id, name) => put(`/api/trunk/${_id}`, {name}),
    putTrunkQuantity: (treeId, quantity) => put(`/api/trunk/${treeId}`, {quantity}),
    
    deleteFacets: (treeId, facetIds) => post('/api/facet/deletion', {treeId, facetIds}),
    deleteImpacts: (treeId, impactIds) => post('/api/impact/deletion', {treeId, impactIds}),
    deleteTrunk: trunkId => del(`/api/trunk/${trunkId}`),
    
    
    postImpact: (trunk, impact) => post(`/api/impact`, {trunk, impact}),
    postFacetEntry: facet => post('/api/facetEntry', facet),
    postImpactEntry: impact => post('/api/impactEntry', impact),
    postTrunk: trunk => post('/api/trunk', trunk),
    postTrunkAdeme: (formData) => upload('/api/trunkBulk/ademe', formData),
    postImpactEntryAdeme: (formData) => upload('/api/impactEntryBulk/ademe', formData),
    postImpactAdeme: (formData) => upload('/api/impactBulk/ademe', formData),
    postTrunkClone: trunkId => post(`/api/trunk?sourceId=${trunkId}`),
    postFeedback: feedback => post(`/api/feedback`, feedback),
    
    
    postMail: ({mail}) => post(`/api/mail`, {mail}),
    postConfirm: async ({token, fullname, password}) => {
        const res = await post(`/api/confirm`, {t: token, fullname, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    },
    postAuth: async ({mail, password}) => {
        const res = await post(`/api/auth`, {mail, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    }
}