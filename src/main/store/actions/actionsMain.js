import Do from "../../const/do";
import On from "../../const/on";
import rest from "../../services/rest";
import _ from 'lodash';
import {trunky, trunkyAll} from "../../services/mapper";

export default {
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TREE, name));
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree));
    },
    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, tree) => {
        commit(Do.OPEN_COMPARE_TO, await dispatch(On.LOAD_TRUNK, tree));
    },

    [On.RENAME_TRUNK]: async ({commit}, {trunk, name}) => {
        await rest.renameTrunk(trunk._id, name);
        commit(Do.RENAME_TRUNK, {trunk, name});
    },

    [On.SEARCH_TREE]: async ({commit}, term) => trunkyAll(await rest.search(term)),

    [On.CLONE_TREE]: async ({}, {_id}) => {
        return rest.cloneTrunk(_id);
    },

    [On.CREATE_TREE]: async ({commit, state, dispatch}, name) => {
        return trunky(await rest.createTrunk({name}));
    },

    [On.DELETE_ROOT]: async ({commit}, {tree, root}) => {
        await rest.deleteRoot(tree._id, root._id);
        commit(Do.DELETE_ROOT, {tree, root});
    },
    [On.DELETE_FACETS]: async ({commit}, {facets, toDelete}) => {
        rest.deleteFacets(facets._id, _.map(toDelete, "_id"));
        commit(Do.DELETE_FACETS, {tree: facets, toDelete});
    },
    [On.DELETE_TREE]: async ({commit}, tree) => {
        await rest.deleteTrunk(tree._id);
        commit(Do.CLOSE_TREE);
    },
    [On.ADD_FACET]: async ({commit}, {tree, facet}) => {
        rest.addFacet(tree._id, facet);
        commit(Do.ADD_FACET, {tree, facet});
    },
    [On.CREATE_FACET_ENTRY]: async ({}, {name, grandeur}) => rest.createFacetEntry({name, grandeur}),

    [On.SEARCH_FACET_ENTRY]: async ({}, {namepart}) => rest.searchFacetEntry(namepart),
    [On.UPSERT_QUANTITY]: async ({commit}, {trunk, quantity}) => {
        await rest.upsertQuantity(trunk._id, quantity);
        commit(Do.UPSERT_QUANTITY, {trunk, quantity});
    },

    [On.ADD_RESSOURCE_TO]: ({}, parentRessource) => {
        console.log(On.ADD_RESSOURCE_TO, parentRessource);
    }
};
