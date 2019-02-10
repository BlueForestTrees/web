import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {applyAspectCoef, createStringObjectId, treeBqt} from "../../services/calculations"
import {map} from 'unit-manip'
import {FACETS} from "../../const/fragments"

export default {

    [On.LOAD_FACET]: ({commit}, {_id, bqt}) => api.getFacets(_id)
        .then(facets => applyAspectCoef(bqt, facets)),

    [On.DELETE_FACETS]:
        ({commit}, {facets, toDelete}) => {
            api.deleteFacets(facets._id, map(toDelete, e => e._id))
            commit(Do.DELETE_FACETS, {facets, toDelete})
        },
    [On.ADD_FACET]: ({}, {tree, entry, quantity}) => {
        const attribute = ({
            _id: createStringObjectId(), type: "facet", color: entry.color,
            impactId: entry._id, name: entry.name,
            quantity: {
                bqt: quantity.bqt / treeBqt(tree),
                g: quantity.g,
            }
        })
        if (tree[FACETS]) {
            tree[FACETS].push(attribute)
        }
        return api.postFacet(attribute._id, tree._id, attribute.impactId, attribute.quantity.bqt)
    }
}