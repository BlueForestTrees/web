import {del, get, arrayOf, post, put, paramsOf, postForm, upload} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"
import cache from "../services/cache"

const categoriesCache = cache({maxLength:30})
const searchTrunkCache = cache({maxLength:5})

const cached = async (method, uri, cache) => cache.get(uri) || cache.put(uri, await get(uri))

export default {
    // DIRECT (id qt) (color name) => à stocker. Les get réutilisent le storage
    searchFacetEntry: namepart => get(`/api/tree/facetEntry${paramsOf({q: namepart})}`),
    searchImpactEntry: namepart => get(`/api/tree/impactEntry${paramsOf({q: namepart})}`),
    searchTrunk: ({g, term, type, aidx, ps, cat}) => cached(get, `/api/tree/trunks${paramsOf({g, q: term, t: type, aidx, ps, ...cat})}`, searchTrunkCache),
    //mixin? pour gérer (name color) et (complet)
    getTrunks: _ids => get(`/api/tree/trunk${arrayOf('_ids', _ids)}`),
    getTrunk: _id => get(`/api/tree/trunk/${_id}`),
    //getImpactEntry
    //getFacetEntry
    
    getGrandeurs: () => get('/api/grandeur'),
    
    
    //peupler les (color name) depuis storage, ou lookup.
    getFacets: _id => get(`/api/tree/facet/${_id}`),
    getImpact: _id => get(`/api/tree/impact/${_id}`),
    getTank: (_id) => get(`/api/tree/tank/${_id}`),
    getBranches: _id => get(`/api/tree/branch/${_id}`),
    getRoots: _id => get(`/api/tree/root/${_id}`),
    getImpactTank: _id => get(`/api/tree/impacttank/${_id}`),
    getCategories: pid => cached(get,`/api/categories${paramsOf({pid: pid || null})}`, categoriesCache),

    putBranch: ({_id, trunkId, rootId, relativeTo, bqt}) => put(`/api/tree/branch`, {_id, trunkId, rootId, bqt}),
    postBranch: ({_id, trunkId, rootId, relativeTo, bqt}) => post(`/api/tree/branch`, {_id, trunkId, rootId, bqt}),
    deleteBranch: _id => del(`/api/tree/branch/${_id}`),
    putRoot: ({_id, trunkId, rootId, relativeTo, bqt}) => put(`/api/tree/root`, {_id, trunkId, rootId, relativeTo, bqt}),
    postRoot: ({_id, trunkId, rootId, relativeTo, bqt}) => post(`/api/tree/root`, {_id, trunkId, rootId, relativeTo, bqt}),
    deleteRoot: _id => del(`/api/tree/root/${_id}`),
    
    putFacet: (trunk, facet) => post(`/api/tree/facet`, {trunk, facet}),
    putTrunkName: (_id, name) => put(`/api/tree/trunk/${_id}`, {name}),
    putTrunkQuantity: (treeId, quantity) => put(`/api/tree/trunk/${treeId}`, {quantity}),
    
    deleteFacets: (treeId, facetIds) => post('/api/tree/facet/deletion', {treeId, facetIds}),
    deleteImpacts: (treeId, impactIds) => post('/api/tree/impact/deletion', {treeId, impactIds}),
    deleteTrunk: trunkId => del(`/api/tree/trunk/${trunkId}`),
    
    
    postImpact: (_id, trunkId, impactId, bqt) => post(`/api/tree/impact`, {_id, trunkId, impactId, bqt}),
    postFacetEntry: facet => post('/api/tree/facetEntry', facet),
    postImpactEntry: impact => post('/api/tree/impactEntry', impact),
    postTrunk: trunk => post('/api/tree/trunk', trunk),

    postTrunkAdeme: (formData) => upload('/api/import/ademe/trunk', formData),
    postCategorieAdeme: (formData) => upload('/api/import/ademe/categories', formData),
    postImpactEntryAdeme: (formData) => upload('/api/import/ademe/impactEntry', formData),
    postImpactAdeme: (formData) => upload('/api/import/ademe/impact', formData),

    postTrunkClone: trunkId => post(`/api/tree/trunk?sourceId=${trunkId}`),
    postFeedback: feedback => post(`/api/feedback`, feedback),
    
    
    postMail: ({mail}) => post(`/api/tree/mail`, {mail}),
    postConfirm: async ({token, fullname, password}) => {
        const res = await post(`/api/tree/confirm`, {t: token, fullname, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    },
    postAuth: async ({mail, password}) => {
        const res = await post(`/api/auth`, {mail, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    }
}