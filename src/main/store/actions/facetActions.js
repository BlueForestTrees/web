import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";
import {hasQuantity} from "../../services/mapper";

export default {

    [On.LOAD_FACETS]: ({commit}, tree) => (
        hasQuantity(tree.trunk) ?
            rest.getQuantifiedFacets(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
            : rest.getFacets(tree._id)
    ).then(facets => commit(Do.ADD_FACETS, {tree, facets})),

    [On.DELETE_FACETS]:
        ({commit}, {facets, toDelete}) => {
            rest.deleteFacets(facets._id, _.map(toDelete, "_id"));
            commit(Do.DELETE_FACETS, {facets, toDelete});
        },
    [On.ADD_FACET]:
        async ({commit}, {tree, facet}) => {
            rest.addFacet(tree._id, facet);
            commit(Do.ADD_FACET, {tree, facet});
        }
}