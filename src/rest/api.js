import {del, get, post, put, paramsOf, upload} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"
import cache from "../services/cache"

const categoriesCache = cache({maxLength: 30})
const userCache = cache({maxLength: 200})

const cached = async (method, uri, cache) => cache.get(uri) || cache.put(uri, await get(uri))

export default {

    saveGame: game => post(`api/game`, game),
    loadGame: _id => get(`api/game/${_id}`),
    saveScore: partie => post(`api/game/score`, partie),

    checkInfoAvailable: path => get(`api/info/check/${path}`),
    postInfo: info => post(`api/info`, info),
    putInfo: info => put(`api/info`, info),
    getInfo: _id => get(`api/info/${_id}`),

    searchGames: ({aidx, ps, oid, term}) => get(`/api/game${paramsOf({q: term, aidx, ps, oid})}`),

    searchInfo: ({term, type, adate, ps, oid}) => get(`/api/info${paramsOf({q: term, t: type, adate, ps, oid})}`),

    deleteInfo: _id => del(`api/info/${_id}`),
    getInfoByPath: path => get(`api/info/path/${path}`),
    getSelection: _id => get(`api/selection/${_id}`),
    selectionOf: oid => get(`api/selection/owner/${oid}`),
    createSelection: selection => post(`/api/selection`, selection),
    updateSelection: selection => put(`/api/selection`, selection),

    searchByFacet: ({bqt, _id, trunkId, limit = 15}) => get(`/api/facet/equiv/${bqt}/${_id}/${limit}${paramsOf({tid: trunkId})}`),
    searchByImpact: ({bqt, _id, trunkId, limit = 15}) => get(`/api/impact/equiv/${bqt}/${_id}/${limit}${paramsOf({tid: trunkId})}`),
    searchByRoot: ({bqt, _id, trunkId, limit = 15}) => get(`/api/tree/root/equiv/${bqt}/${_id}/${limit}${paramsOf({tid: trunkId})}`),

    searchFacetEntry: namepart => get(`/api/facetEntry${paramsOf({q: namepart})}`),
    searchImpactEntry: namepart => get(`/api/impactEntry${paramsOf({q: namepart})}`),

    searchTrunk: ({g, term, type, aidx, ps, cat, oid}) => get(`/api/search${paramsOf({g, q: term, t: type, aidx, ps, ...cat, oid})}`),
    searchAll: ({type, ps, adate, cat, oid, term, iid, fid}) => get(`/api/search${paramsOf({t: type, ps, adate, cat, oid, q: term, iid, fid})}`),
    searchUsers: ({term}) => get(`/api/user/term/${term}`),

    getUser: _id => cached(get, `/api/user/${_id}`, userCache),
    updateUser: user => put(`/api/user`, user),
    getTrunk: _id => get(`/api/tree/trunk/${_id}`),
    getGrandeurs: () => get('/api/grandeur'),
    getFilm: () => get(`/api/film/random`),
    getFacets: _id => get(`/api/facet/${_id}`),
    getImpact: _id => get(`/api/impact/${_id}`),
    getDamage: _id => get(`/api/damage/${_id}`),
    getTank: (_id) => get(`/api/tree/tank/${_id}`),
    getBranches: _id => get(`/api/tree/branch/${_id}`),
    getRoots: _id => get(`/api/tree/root/${_id}`),
    getImpactTank: _id => get(`/api/impactTank/${_id}`),
    getDamageTank: _id => get(`/api/damageTank/${_id}`),
    getCategories: pid => cached(get, `/api/categorie${paramsOf({pid: pid || null})}`, categoriesCache),
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

    putFacet: (trunk, facet) => post(`/api/facet`, {trunk, facet}),
    putTrunkName: (_id, name) => put(`/api/tree/trunk/${_id}`, {name}),
    putTrunkQuantity: (treeId, quantity) => put(`/api/tree/trunk/${treeId}`, {quantity}),

    deleteRoot: (trunkId, _id) => del(`/api/tree/root/${trunkId}/${_id}`),
    deleteFacet: (trunkId, _id) => del(`/api/facet/${trunkId}/${_id}`),
    deleteImpact: (trunkId, _id) => del(`/api/impact/${trunkId}/${_id}`),

    deleteTrunk: trunkId => del(`/api/tree/trunk/${trunkId}`),


    postImpact: (_id, trunkId, impactId, bqt) => post(`/api/impact`, {_id, trunkId, impactId, bqt}),
    postFacet: (_id, trunkId, facetId, bqt) => post(`/api/facet`, {_id, trunkId, facetId, bqt}),
    postDamage: (_id, trunkId, damageId, bqt) => post(`/api/damage`, {_id, trunkId, damageId, bqt}),

    postFacetEntry: facet => post('/api/facetEntry', facet),
    postImpactEntry: impact => post('/api/impactEntry', impact),
    postTrunk: trunk => post('/api/tree/trunk', trunk),

    postTrunkAdeme: (formData) => upload('/api/import/ademe/trunk', formData),
    postCategorieAdeme: (formData) => upload('/api/import/ademe/categories', formData),
    postImpactEntryAdeme: (formData) => upload('/api/import/ademe/impactEntry', formData),
    postImpactAdeme: (formData) => upload('/api/import/ademe/impact', formData),

    postTrunkClone: trunkId => post(`/api/tree/trunk?sourceId=${trunkId}`),


    postSuscription: ({mail}) => post(`/api/user/suscribe`, {mail}),
    postConfirm: async ({token, fullname, password}) => {
        const res = await post(`/api/user/confirm`, {t: token, fullname, password})
        return {token: res.headers.map[X_ACCESS_TOKEN][0]}
    },
    postAuth: async ({mail, password}) => {
        const res = await post(`/api/user/login`, {mail, password})
        return {token: res.headers.map[X_ACCESS_TOKEN][0]}
    }

}