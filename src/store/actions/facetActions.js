import On from "../../const/on"
import api from "../../rest/api"
import {applyAspectCoef, createStringObjectId, treeBqt} from "../../services/calculations"
import {FACETS} from "../../const/fragments"
import Do from "../../const/do"

export default {

    [On.LOAD_FACET]: ({commit}, {_id, bqt}) => api.getFacets(_id)
        .then(facets => applyAspectCoef(bqt, facets)),

    [On.DELETE_FACET]:
        ({commit, dispatch}, {tree, facet}) =>
            api.deleteFacet(tree._id, facet._id, facet.facetId)
                .then(() => commit(Do.DELETE_FACET, {tree, facet}))
                .then(() => dispatch(On.SNACKBAR, {text: "Propriété rétirée"})),


    [On.ADD_FACET]: ({state}, {tree, entry, quantity}) => {
        const attribute = ({
            _id: createStringObjectId(), type: "facet", color: entry.color,
            impactId: entry._id, name: entry.name,
            quantity: {
                bqt: quantity.bqt / treeBqt(tree) / state.treeCoef,
                g: quantity.g,
            }
        })
        if (tree[FACETS]) {
            tree[FACETS].push(attribute)
        }
        return api.postFacet(attribute._id, tree._id, attribute.impactId, attribute.quantity.bqt)
    }
}