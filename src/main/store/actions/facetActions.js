import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";

export default {

    [On.LOAD_FACETS]: ({}, {_id}) => {
        return rest.getFacets(_id);
    },

    [On.DELETE_FACETS]: async ({commit}, {facets, toDelete}) => {
        rest.deleteFacets(facets._id, _.map(toDelete, "_id"));
        commit(Do.DELETE_FACETS, {facets, toDelete});
    },
    [On.ADD_FACET]: async ({commit}, {tree, facet}) => {
        rest.addFacet(tree._id, facet);
        commit(Do.ADD_FACET, {tree, facet});
    }
}