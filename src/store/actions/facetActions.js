import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {idQtFrom, applyAspectCoef} from "../../services/calculations"
import {map} from 'unit-manip'

export default {

    [On.LOAD_FACETS]: ({commit}, {_id, bqt}) => api.getFacets(_id)
        .then(facets => applyAspectCoef(bqt, facets)),

    [On.DELETE_FACETS]:
        ({commit}, {facets, toDelete}) => {
            api.deleteFacets(facets._id, map(toDelete, e => e._id))
            commit(Do.DELETE_FACETS, {facets, toDelete})
        }
}