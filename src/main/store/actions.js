import Do from "../const/do";
import On from "../const/on";
import rest from "../services/rest";
import units from "../services/units";

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        dispatch(On.LOAD_UNITS);

        await dispatch(On.LOAD_OPEN_TRUNK, {_id: "5a6a03c03e77667641d2d2c3"});
        // await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "5a5b9e6bf0cd7a63cbf236bd"});

    },

    [On.RENAME_TRUNK]: async ({commit}, {trunk, name}) => {
        await rest.renameTrunk(trunk._id, name);
        commit(Do.RENAME_TRUNK, {trunk, name});
    },

    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },

    [On.SEARCH]: async ({commit}, term) => await rest.search(term),

    [On.CREATE_AND_OPEN_TRUNK]: async ({dispatch}, {name}) => {
        dispatch(On.LOAD_OPEN_TRUNK, await dispatch(On.CREATE_TRUNK, name));
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TRUNK, await dispatch(On.CLONE_TREE, tree));
    },
    [On.CLONE_TREE]: async ({}, {_id}) => {
        return await rest.cloneTree(_id);
    },
    [On.LOAD_TRUNK]: async ({dispatch}, {_id}) => {
        let tree = null;
        try {
            tree = await rest.getTrunk(_id);
        } catch (e) {
            dispatch(On.EXCEPTION, e);
        }
        return tree;
    },
    [On.LOAD_OPEN_TRUNK]: async ({dispatch, commit, state}, treeToLoad) => {
        commit(Do.CLOSE_TRUNK);
        commit(Do.INIT_TREE, {tree: state.tree, treeToLoad});
        dispatch(On.LOAD_TRUNK, treeToLoad).then(trunk => commit(Do.SET_TRUNK, {tree: state.tree, trunk}));
        dispatch(On.LOAD_FACETS, treeToLoad).then(facets => commit(Do.ADD_FACETS, {tree: state.tree, facets}));
        dispatch(On.LOAD_ROOTS, treeToLoad).then(roots => commit(Do.ADD_ROOTS, {tree: state.tree, roots}));
    },
    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, tree) => {
        commit(Do.OPEN_COMPARE_TO, await dispatch(On.LOAD_TRUNK, tree));
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return await rest.cancreate({name});
    },

    [On.ADD_ROOTS]: async ({commit}, {tree, roots}) => {
        await Promise.all(_.map(roots, root => rest.linkRoot(tree._id, root._id)));
        commit(Do.ADD_ROOTS, {tree, roots});
    },
    [On.LOAD_FACETS]: async ({commit}, trunk) => {
        return rest.getFacets(trunk._id);
    },
    [On.LOAD_ROOTS]: async ({commit}, trunk) => {
        return rest.getRoots(trunk._id);
    },
    [On.DELETE_ROOT]: async ({commit}, {tree, root}) => {
        rest.deleteRoot(tree._id, root._id);
        commit(Do.DELETE_ROOT, {tree, root});
    },
    [On.DELETE_FACETS]: async ({commit}, {facets, toDelete}) => {
        rest.deleteFacets(facets._id, _.map(toDelete, "_id"));
        commit(Do.DELETE_FACETS, {tree: facets, toDelete});
    },
    [On.DELETE_TREE]: async ({commit}, tree) => {
        await rest.deleteTree(tree._id);
        commit(Do.CLOSE_TRUNK);
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
