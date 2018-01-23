import Do from "../const/do";
import On from "../const/on";
import rest from "../services/rest";
import units from "../services/units";

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        dispatch(On.LOAD_UNITS);

         await dispatch(On.LOAD_OPEN_TREE, {_id: "5a65fcf363e2a32531ed9f9b"});
         // await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "5a5b9e6bf0cd7a63cbf236bd"});

    },

    [On.RENAME_TREE]: async ({commit}, {tree, name}) => {
        await rest.renameTree(tree._id, name);
        commit(Do.RENAME_TREE, {tree, name});
    },

    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },

    [On.SEARCH]: async ({commit}, term) => await rest.search(term),

    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        const tree = await dispatch(On.CREATE_TRUNK, name);
        return dispatch(On.LOAD_OPEN_TREE, tree);
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        const clone = await dispatch(On.CLONE_TREE, tree);
        return await dispatch(On.LOAD_OPEN_TREE, clone);
    },
    [On.CLONE_TREE]: async ({}, {_id}) => {
          return await rest.cloneTree(_id);
    },
    [On.LOAD_TREE]: async ({dispatch}, {_id})=>{
        let tree = null;
        try {
            tree = await rest.get(_id);
        } catch (e) {
            dispatch(On.EXCEPTION, e);
        }
        return tree;
    },
    [On.LOAD_OPEN_TREE]: async ({dispatch, commit}, tree) => {
        const loadedTree = await dispatch(On.LOAD_TREE, tree);

        commit(Do.CLOSE_TREE);
        commit(Do.OPEN_TREE, loadedTree);

        return loadedTree;
    },
    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, tree) => {
        commit(Do.OPEN_COMPARE_TO, await dispatch(On.LOAD_TREE, tree));
    },


    [On.CREATE_TRUNK_THEN_SEED]: async ({state, dispatch, commit}, name) => {
        const seed = await dispatch(On.CREATE_TRUNK, name);
        await dispatch(On.CREATE_SEED, seed);
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return await rest.cancreate({name});
    },
    [On.CREATE_SEED]: async ({commit, dispatch, getters}, seed) => {
        await rest.link({trunkId: getters.seed._id, rootId: seed._id});
        commit(Do.ADD_SEED, {root: getters.seed, seed: await dispatch(On.LOAD_TREE, seed)});
    },

    [On.ADD_RESSOURCE]: async ({commit, dispatch}, {parent,child}) => {
        await rest.link({trunkId: parent._id, rootId: child._id});

        commit(Do.ADD_SEED, {root: parent, seed: await dispatch(On.LOAD_TREE, child)});
    },





    [On.DELETE_ROOT]: async ({commit}, {tree, root}) => {
        rest.deleteRoot(tree._id, root._id);
        commit(Do.DELETE_ROOT, {tree, root});
    },
    [On.DELETE_FACETS]: async ({commit}, {tree, facets}) => {
        rest.deleteFacets(tree._id, _.map(facets, "_id"));
        commit(Do.DELETE_FACETS, {tree, facets});
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
    [On.UPSERT_PRICE]: async ({commit}, {tree, price}) => {
        await rest.upsertPrice(tree._id, price);
        commit(Do.UPSERT_PRICE, {tree, price});
    },
    [On.UPSERT_QUANTITY]: async ({commit}, {tree, quantity}) => {
        await rest.upsertQuantity(tree._id, quantity);
        commit(Do.UPSERT_QUANTITY, {tree, quantity});
    },

    [On.ADD_RESSOURCE_TO]: ({}, parentRessource) => {
        console.log(On.ADD_RESSOURCE_TO, parentRessource);
    }
};
