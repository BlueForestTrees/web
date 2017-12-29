import {Do} from "./keys";
import {On} from "./keys";
import trunks from "../services/trunks";

export default {
    [On.UPDATE_SEARCH_TERM]: ({commit, dispatch}, term) => {
        commit(Do.UPDATE_TERM, term);
        if (term) {
            commit(Do.UPDATE_SEARCHING, true);
            return dispatch(On.SEARCH, term);
        } else {
            commit(Do.CLEAR_SEARCH);
        }
    },
    [On.SEARCH]: async ({commit}, term) => {
        commit(Do.UPDATE_RESULTS, await trunks.search(term));
        commit(Do.UPDATE_SEARCHING, false);
    },
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, name) => {
        const tree = await dispatch(On.CREATE_TRUNK, name);
        return dispatch(On.OPEN_TREE, tree);
    },
    [On.OPEN_TREE]: async ({commit}, trunk) => {
        commit(Do.OPEN_TREE, await trunks.get(trunk._id));
        commit(Do.CLEAR_SEARCH);
    },
    [On.CREATE_SEED]: async ({commit, dispatch, getters}, seed) => {
        await trunks.link({trunkId: getters.seed._id, rootId: seed._id});
        commit(Do.ADD_SEED, {root: getters.seed, seed: await trunks.get(seed._id)});
        commit(Do.CLEAR_SEARCH);
    },

    [On.CREATE_TRUNK_THEN_SEED]: async ({state, dispatch, commit}, name) => {
        const seed = await dispatch(On.CREATE_TRUNK, name);
        await dispatch(On.CREATE_SEED, seed);
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return await trunks.create({name});
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
    [On.TRUNK_CLOSE]: ({commit}) => {
        commit(Do.CLOSE_TREE);
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
        await trunks.qtUnit({
            trunk: {_id: trunkId, qt: trunkQt},
            root: {_id: rootId, qt: rootQt}
        });
    },
    [On.REFRESH_ROOT]: async ({}, {trunk, root}) => {
        let newRoot = await trunks.getQuantified(root.qt, root._id);
        commit(Do.UPDATE_ROOT, {trunk, root: newRoot});
        commit(Do.UPDATE_PATH_ITEM, newRoot);
    },
    [On.UPDATE_ADDING_SEED_CLICK]: async ({commit}, value) => {
        commit(Do.UPDATE_ADDING_SEED, value);
    }
};