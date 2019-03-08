import On from "../../const/on"
import router from "../../router/router"
import {GO} from "../../const/go"
import api from "../../rest/api"
import {map} from "unit-manip"
import {treefy} from "../../services/calculations"
import {TRUNK} from "../../const/fragments"

export default {
    [On.LOAD_GAME]: ({}, {_id}) => api.loadGame(_id),
    [On.SEARCH_GAMES]: ({}, filter) => api.searchGames(filter),
    [On.SAVE_GAME]: ({}, game) => api.saveGame(game),
    [On.SAVE_SCORE]: ({}, score) => api.saveScore(score),
    [On.GO_EQUIV]: ({dispatch}, {tree, oneSelected}) => {
        const params = {
            _id: tree._id,
            bqt: tree.trunk.quantity.bqt,
            s_id: oneSelected._id,
            sbqt: oneSelected.trunk ? oneSelected.trunk.quantity.bqt : oneSelected.quantity.bqt
        }
        dispatch(On.UNSELECT)
        return router.push({name: GO.EQUIV, params})
    },
    [On.GO_QUI_DEUX_FOIS_PLUS]: ({dispatch}, {tree, oneSelected}) => {
        const params = {
            _id: tree._id,
            bqt: tree.trunk.quantity.bqt,
            fid: oneSelected[`${oneSelected.type}Id`],
            f: oneSelected.type
        }
        dispatch(On.UNSELECT)
        return router.push({name: GO.QUI_2, params})
    },
    [On.RANDOM_TREE_FROM_FRAGMENT]: ({dispatch}, {entryId, bqt, type, trunkId}) => {
        if (type === "facet") {
            return api.searchByFacet({bqt, _id: entryId, limit: 1, trunkId})
                .then(idBqts => dispatch(On.LOAD_TREE, {...idBqts[0], fragments: [TRUNK]}))
        } else if (type === "impact") {
            return api.searchByImpact({bqt, _id: entryId, limit: 1, trunkId})
                .then(idBqts => dispatch(On.LOAD_TREE, {...idBqts[0], fragments: [TRUNK]}))
        } else if (type === "root") {
            return api.searchByRoot({bqt, _id: entryId, limit: 1, trunkId})
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