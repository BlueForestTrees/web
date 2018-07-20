import On from "../../const/on";
import api from "../../rest/api";
import Do from "../../const/do";
import {hasQuantity, idQtFrom} from "../../services/calculations";

export default {

    [On.LOAD_FACETS]: ({commit}, tree) =>
        (hasQuantity(tree.trunk) ?
                api.getQuantifiedFacets(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
                :
                api.getFacets(tree._id)
        ).then(facets => commit(Do.ADD_FACETS, {tree, facets})),

    [On.DELETE_FACETS]:
        ({commit}, {facets, toDelete}) => {
            api.deleteFacets(facets._id, _.map(toDelete, "_id"));
            commit(Do.DELETE_FACETS, {facets, toDelete});
        },
    [On.ADD_FACET]:
        async ({commit}, {tree, facet}) => {
            api.addFacet(idQtFrom(tree.trunk), idQtFrom(facet));
            commit(Do.ADD_FACET, {tree, facet});
        }
}