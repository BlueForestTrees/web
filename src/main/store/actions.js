import * as Do from "./mutationKeys";
import * as On from "./actionKeys";
import trunks from "../services/trunks";

export default {
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, name) => {
        const tree = await dispatch(On.CREATE_TRUNK, name);
        return dispatch(On.OPEN_TREE, tree);
    },
    [On.OPEN_TREE]: async ({commit}, trunk) => {
        let tree = await trunks.get(trunk._id);
        commit(Do.OPEN_TREE, tree);
        commit(Do.CLEAR_SEARCH);
    },
    [On.CREATE_SEED]: async ({commit, dispatch, getters}, seed) => {
        await trunks.link({trunkId: getters.seed._id, rootId: seed._id});
        commit(Do.ADD_SEED, {root: getters.seed, seed: seed});
        commit(Do.CLEAR_SEARCH);
    },

    [On.CREATE_TRUNK_THEN_SEED]: async ({state, dispatch, commit}, name) => {
        const seed = await dispatch(On.CREATE_TRUNK, name);
        await dispatch(On.CREATE_SEED, seed);
        commit(Do.CLEAR_SEARCH);
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return await trunks.create({name});
    },

    [On.PATH_CLICK]: ({commit}, idx) => {
        commit(Do.CHANGE_PATH_INDEX, idx);
    },
    [On.PATH_LINK_CLICK]: ({commit}, link) => {
        commit(Do.LINK_EDIT, link);
    },
    [On.ROOT_CLICK]: ({commit}, root) => {
        commit(Do.ADD_TO_PATH, root);
    },
    [On.TRUNK_CLOSE]: ({commit}) => {
        commit(Do.CLOSE_TREE);
    },
    [On.SET_QT_UNIT]: async ({commit}, {trunk, root, trunkQt, rootQt}) => {
        await trunks.qtUnit({
            trunk:{_id:trunk._id, qt: trunkQt},
            root:{_id:root._id, qt: rootQt}
        });
        commit(Do.LINK_EDIT, null);
    }


};
