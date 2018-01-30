import Do from "../const/do";
import On from "../const/on";
import rest from "../services/rest";
import units from "../services/units";

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        dispatch(On.LOAD_UNITS);
        await dispatch(On.LOAD_OPEN_TREE, {_id: "5a6a03c03e77667641d2d2c3"});
    },
    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },


    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TRUNK, name));
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree));
    },
    [On.LOAD_OPEN_TREE]: async ({commit, state}, {_id}) => {
        commit(Do.CLOSE_TREE);
        commit(Do.INIT_TREE, {tree: state.tree, _id});
        rest.getTrunk(_id).then(trunk => commit(Do.SET_TRUNK, {tree: state.tree, trunk}));
        rest.getFacets(_id).then(facets => commit(Do.ADD_FACETS, {tree: state.tree, facets}));
        rest.getRoots(_id).then(roots => commit(Do.SET_ROOTS, {tree: state.tree, roots}));
    },



    [On.LOAD_TRUNK]: async ({}, {_id}) => {
        return rest.getTrunk(_id);
    },
    [On.LOAD_FACETS]: async ({}, trunk) => {
        return rest.getFacets(trunk._id);
    },
    [On.LOAD_ROOTS]: async ({commit}, tree) => {
        await rest.getRoots(tree._id).then(roots=>commit(Do.SET_ROOTS, {tree, roots}));
    },





    [On.RENAME_TRUNK]: async ({commit}, {trunk, name}) => {
        await rest.renameTrunk(trunk._id, name);
        commit(Do.RENAME_TRUNK, {trunk, name});
    },


    [On.SEARCH]: async ({commit}, term) => await rest.search(term),

    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.CLONE_TREE]: async ({}, {_id}) => {
        return rest.cloneTree(_id);
    },
    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, tree) => {
        commit(Do.OPEN_COMPARE_TO, await dispatch(On.LOAD_TRUNK, tree));
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return rest.cancreate({name});
    },

    [On.ADD_ROOTS]: async ({commit}, {tree, roots}) => {
        await Promise.all(_.map(roots, root => rest.linkRoot(tree._id, root._id)));
        commit(Do.ADD_ROOTS, {tree, roots});
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
        await rest.deleteTree(tree._id);
        commit(Do.CLOSE_TREE);
    },
    [On.ADD_FACET]: async ({commit}, {tree, facet}) => {
        rest.addFacet(tree._id, facet);
        commit(Do.ADD_FACET, {tree, facet});
    },
    [On.CREATE_FACET_ENTRY]: async ({}, {name, grandeur}) => rest.createFacetEntry({name, grandeur}),

    [On.SEARCH_FACET_ENTRY]: async ({}, {namepart}) => rest.searchFacetEntry(namepart),
    [On.FOCUS_ON_SEARCH]: () => {
        console.log("focus on search");
    },
    [On.UPSERT_QUANTITY]: async ({commit}, {trunk, quantity}) => {
        await rest.upsertQuantity(trunk._id, quantity);
        commit(Do.UPSERT_QUANTITY, {trunk, quantity});
    },

    [On.ADD_RESSOURCE_TO]: ({}, parentRessource) => {
        console.log(On.ADD_RESSOURCE_TO, parentRessource);
    }
};
