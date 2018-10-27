import On from "../../const/on"
import router from "../../router/router"
import {GO} from "../../const/go"
import api from "../../rest/api"

const mapTrunks = (dispatch, results) => async idBqts => {
    idBqts.forEach(async idBqt => {
        let t = await dispatch(On.LOAD_TRUNK, idBqt)
        t && results.push(t)
    })
}

export default {
    [On.GO_EQUIV]: ({}, {_id, bqt, sbqt, s_id}) => {
        return router.push({name: GO.EQUIV, params: {_id, bqt, sbqt, s_id}})
    },
    [On.SEARCH_EQUIV]: ({dispatch}, {_id, bqt, type, results}) => {
        if (type === "facet") {
            return api.searchByFacet({bqt, _id}).then(mapTrunks(dispatch, results))
        } else if (type === "impact") {
            return api.searchByImpact({bqt, _id}).then(mapTrunks(dispatch, results))
        } else {
            throw `type d'équivalence inconnu ${type} (${bqt}/${_id})`
        }
    }
}