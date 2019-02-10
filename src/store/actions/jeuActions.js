import On from "../../const/on"
import router from "../../router/router"
import {GO} from "../../const/go"
import api from "../../rest/api"
import {map} from "unit-manip"
import {treefy} from "../../services/calculations"
import {TRUNK} from "../../const/fragments"

export default {
    [On.GO_EQUIV]: ({dispatch}, {_id, bqt, sbqt, s_id}) => {
        dispatch(On.UNSELECT)
        return router.push({name: GO.EQUIV, params: {_id, bqt, sbqt, s_id}})
    },
    [On.GO_QUI_DEUX_FOIS_PLUS]: ({dispatch}, {_id, bqt, f, fid}) => {
        dispatch(On.UNSELECT)
        return router.push({name: GO.QUI_2, params: {_id, bqt, f, fid}})
    },
    [On.RANDOM_TREE_FROM_FRAGMENT]: ({dispatch}, {entryId, bqt, type}) => {
        if (type === "facet") {
            return api.searchByFacet({bqt, _id: entryId, limit: 1})
                .then(idBqts => dispatch(On.LOAD_TREE, {...idBqts[0], fragments: [TRUNK]}))
        } else if (type === "impact") {
            return api.searchByImpact({bqt, _id: entryId, limit: 1})
                .then(idBqts => dispatch(On.LOAD_TREE, {...idBqts[0], fragments: [TRUNK]}))
        } else if (type === "root") {
            return api.searchByRoot({bqt, _id: entryId, limit: 1})
                .then(idBqts => dispatch(On.LOAD_TREE, {...idBqts[0], fragments: [TRUNK]}))
        } else {
            throw `type d'équivalence inconnu ${type} (${bqt}/${_id})`
        }
    },
    [On.SEARCH_EQUIV]: ({dispatch}, {_id, bqt, type, results}) => {
        results.splice(0)
        if (type === "facet") {
            return api.searchByFacet({bqt, _id}).then(mapTrunks(dispatch, results))
        } else if (type === "impact") {
            return api.searchByImpact({bqt, _id}).then(mapTrunks(dispatch, results))
        } else if (type === "root") {
            return api.searchByRoot({bqt, _id}).then(mapTrunks(dispatch, results))
        } else {
            throw `type d'équivalence inconnu ${type} (${bqt}/${_id})`
        }
    }
}

const mapTrunks = (dispatch, results) => async idBqts => Promise.all(
    map(idBqts, async idBqt => {
        let t = await dispatch(On.LOAD_TRUNK, idBqt).then(treefy)
        t && results.push(t)
    }))