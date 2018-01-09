import {Do} from "../const/do";
import {On} from "../const/on";
import rest from "../services/rest";
import units from "../services/units";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        dispatch(On.LOAD_UNITS);

        //ouvrir la tarte
        dispatch(On.OPEN_TREE, {_id: "5a54da9a4a47fa5eec339b7e"});
    },
    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },


    [On.UPDATE_LOOKUP_TERM]: ({commit, dispatch}, {lookup, term}) => {
        commit(Do.UPDATE_LOOKUP_TERM, {lookup, term});
        if (term) {
            commit(Do.UPDATE_LOOKUP_SEARCHING, {lookup, searching: true});
            return dispatch(On.LOOKUP_SEARCH, {lookup, term});
        } else {
            commit(Do.CLEAR_LOOKUP_SEARCH, lookup);
        }
    },
    [On.LOOKUP_SEARCH]: async ({commit}, {lookup, term}) => {
        commit(Do.UPDATE_LOOKUP_RESULTS, {lookup, results: await rest.search(term)});
        commit(Do.UPDATE_LOOKUP_SEARCHING, {lookup, searching: false});
    },
    [On.LOOKUP_TRUNK]:async({},name)=>await rest.lookupTrunk(name),
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        const tree = await dispatch(On.CREATE_TRUNK, name);
        return dispatch(On.OPEN_TREE, tree);
    },
    [On.EXCEPTION]: ({},e) => {
        console.error("saloute",e);
    },
    [On.OPEN_TREE]: async ({dispatch, commit}, trunk) => {
        let tree = null;
        try {
            tree = await rest.get(trunk._id);
        } catch (e) {
            dispatch(On.EXCEPTION, e);
        }
        commit(Do.OPEN_TREE, tree);
    },
    [On.OPEN_COMPARE_TO]: async ({commit}, trunk) => {
        commit(Do.OPEN_COMPARE_TO, await rest.get(trunk._id));
    },

    [On.CREATE_SEED]: async ({commit, dispatch, getters}, seed) => {
        await rest.link({trunkId: getters.seed._id, rootId: seed._id});
        commit(Do.ADD_SEED, {root: getters.seed, seed: await rest.get(seed._id)});
    },

    [On.CREATE_TRUNK_THEN_SEED]: async ({state, dispatch, commit}, name) => {
        const seed = await dispatch(On.CREATE_TRUNK, name);
        await dispatch(On.CREATE_SEED, seed);
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return await rest.cancreate({name});
    },

    [On.PATH_CLICK]: ({commit, dispatch}, idx) => {
        commit(Do.CHANGE_PATH_INDEX, idx);
        dispatch(On.PATH_CHANGED);
    },
    [On.PATH_LINK_CLICK]: ({commit, dispatch}, link) => {
        commit(Do.UPDATE_LINK_EDIT, link);
    },
    [On.PATH_CHANGED]: ({commit, state, dispatch}) => {
        if (state.linkEdit) {
            if (state.path.length >= 2) {
                commit(Do.UPDATE_LINK_EDIT, {
                    trunk: _.nth(state.path, -2),
                    root: _.nth(state.path, -1)
                });
            } else {
                dispatch(On.CLEAR_LINK_EDIT);
            }
        }
    },
    [On.CLEAR_LINK_EDIT]: ({commit}) => {
        commit(Do.UPDATE_LINK_EDIT, null);
    },
    [On.ROOT_CLICK]: ({commit, dispatch}, root) => {
        commit(Do.ADD_TO_PATH, root);
        dispatch(On.PATH_CHANGED);
    },
    [On.LINK_CHANGED]: async ({dispatch, commit, getters}, {trunk, root, trunkQt, rootQt}) => {
        await dispatch(On.UPSERT_LINK, {trunkId: trunk._id, rootId: root._id, trunkQt, rootQt});

        if (getters.isCurrentTrunk(trunk)) {
            commit(Do.UPDATE_QT, {trunk, qt: trunkQt});
        }

        //si le parent a une quantité, on rafraichit tout l'enfant en proportion.
        if (trunk.qt) {
            await dispatch(On.REFRESH_ROOT, {trunk, root: {_id: root._id, qt: rootQt * trunk.qt / trunkQt}});
        }

        commit(Do.UPDATE_LINK_EDIT, null);
    },
    [On.UPSERT_LINK]: async ({}, {trunkId, rootId, trunkQt, rootQt}) => {
        //pour faire x de a, il faut y de b.
        await rest.qtUnit({
            trunk: {_id: trunkId, qt: trunkQt},
            root: {_id: rootId, qt: rootQt}
        });
    },
    [On.REFRESH_ROOT]: async ({}, {trunk, root}) => {
        let newRoot = await rest.getQuantified(root.qt, root._id);
        commit(Do.UPDATE_ROOT, {trunk, root: newRoot});
        commit(Do.UPDATE_PATH_ITEM, newRoot);
    },
    [On.UPDATE_ADDING_SEED_CLICK]: async ({commit}, value) => {
        commit(Do.UPDATE_ADDING_SEED, value);
    },
    [On.ADD_FACET]: async ({commit}, {tree, facet}) => {
        rest.addFacet(tree._id, facet);
        commit(Do.ADD_FACET, {tree, facet});
    },
    [On.CREATE_FACET]: async ({}, {name,grandeur}) => rest.createFacet({name,grandeur}),

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
    }
};
