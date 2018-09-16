import {del, get, arrayOf, post, put, paramsOf, postForm, upload} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"
import cache from "../services/cache"

const categoriesCache = cache({maxLength: 30})
const searchTrunkCache = cache({maxLength: 5})
const userCache = cache({maxLength: 200})

const cached = async (method, uri, cache) => cache.get(uri) || cache.put(uri, await get(uri))

export default {
    searchFacetEntry: namepart => get(`/api/facetEntry${paramsOf({q: namepart})}`),
    searchImpactEntry: namepart => get(`/api/tree/impactEntry${paramsOf({q: namepart})}`),
    searchTrunk: ({g, term, type, aidx, ps, cat, oid}) => cached(get, `/api/tree/trunks${paramsOf({g, q: term, t: type, aidx, ps, ...cat, oid})}`, searchTrunkCache),

    getUser: _id => cached(get, `/api/user/${_id}`, userCache),
    getTrunk: _id => get(`/api/tree/trunk/${_id}`),
    getGrandeurs: () => get('/api/grandeur'),
    getFacets: _id => get(`/api/facet/${_id}`),
    getImpact: _id => get(`/api/tree/impact/${_id}`),
    getTank: (_id) => get(`/api/tree/tank/${_id}`),
    getBranches: _id => get(`/api/tree/branch/${_id}`),
    getRoots: _id => get(`/api/tree/root/${_id}`),
    getImpactTank: _id => get(`/api/tree/impacttank/${_id}`),
    getCategories: pid => cached(get, `/api/categories${paramsOf({pid: pid || null})}`, categoriesCache),


    getMessageCount: filter => get(`/api/message/count${paramsOf(filter)}`),
    getMessages: filter => get(`/api/message${paramsOf(filter)}`),

    putRoot: ({_id, trunkId, rootId, relativeTo, bqt}) => put(`/api/tree/root`, {_id, trunkId, rootId, relativeTo, bqt}),
    postRoot: ({_id, trunkId, rootId, relativeTo, bqt}) => post(`/api/tree/root`, {_id, trunkId, rootId, relativeTo, bqt}),
    postMessage: message => post(`/api/message`, message),
    putMessage: message => put(`/api/message`, message),
    deleteMessage: _id => del(`/api/message/${_id}`),
    deleteReply: ({msgId, _id}) => del(`/api/message/reply/${msgId}/${_id}`),
    putReply: reply => put(`/api/message/reply`, reply),
    postReply: ({_id, msgId, message}) => post(`/api/message/reply`, {_id, msgId, message}),
    deleteRoot: _id => del(`/api/tree/root/${_id}`),

    putFacet: (trunk, facet) => post(`/api/facet`, {trunk, facet}),
    putTrunkName: (_id, name) => put(`/api/tree/trunk/${_id}`, {name}),
    putTrunkQuantity: (treeId, quantity) => put(`/api/tree/trunk/${treeId}`, {quantity}),

    deleteFacets: (treeId, facetIds) => post('/api/facet/deletion', {treeId, facetIds}),
    deleteImpacts: (treeId, impactIds) => post('/api/tree/impact/deletion', {treeId, impactIds}),
    deleteTrunk: trunkId => del(`/api/tree/trunk/${trunkId}`),


    postImpact: (_id, trunkId, impactId, bqt) => post(`/api/tree/impact`, {_id, trunkId, impactId, bqt}),
    postFacetEntry: facet => post('/api/facetEntry', facet),
    postImpactEntry: impact => post('/api/tree/impactEntry', impact),
    postTrunk: trunk => post('/api/tree/trunk', trunk),

    postTrunkAdeme: (formData) => upload('/api/import/ademe/trunk', formData),
    postCategorieAdeme: (formData) => upload('/api/import/ademe/categories', formData),
    postImpactEntryAdeme: (formData) => upload('/api/import/ademe/impactEntry', formData),
    postImpactAdeme: (formData) => upload('/api/import/ademe/impact', formData),

    postTrunkClone: trunkId => post(`/api/tree/trunk?sourceId=${trunkId}`),


    postSuscription: ({mail}) => post(`/api/user/suscribe`, {mail}),
    postConfirm: async ({token, fullname, password}) => {
        const res = await post(`/api/user/confirm`, {t: token, fullname, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    },
    postAuth: async ({mail, password}) => {
        const res = await post(`/api/user/login`, {mail, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    },

    getFilm: name => get(`/api/film/${name}`)
}