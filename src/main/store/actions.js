import * as Do from "./mutationKeys";
import * as On from "./actionKeys";
import {DEBOUNCE_DELAY} from "../services/const";
import trunks from "../services/trunks";
import _ from 'lodash';

export default {
    [On.CREATE_AND_OPEN_TREE_CLICK]: async ({state, dispatch}) => {
        const term = state.search.term;
        const tree = await dispatch(On.CREATE_TRUNK, term);
        return dispatch(On.OPEN_TREE_CLICK, tree);
    },
    [On.CREATE_SEED_CLICK]: async ({commit, dispatch, getters}, seed) => {
        await trunks.link({trunkId: getters.seed._id, rootId: seed._id});
        commit(Do.ADD_SEED, {root:getters.seed, seed:seed});
    },

    [On.CREATE_TRUNK_THEN_SEED_CLICK]: async ({state, dispatch, commit}) => {
        const term = state.search.term;
        const seed = await dispatch(On.CREATE_TRUNK, term);
        await dispatch(On.CREATE_SEED_CLICK, seed);
        commit(Do.CLEAR_SEARCH);
    },

    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, term) => {
        return await trunks.create({name: term});
    },

    [On.PATH_CLICK]: ({commit}, idx) => {
        commit(Do.CHANGE_PATH_INDEX, idx);
    },
    [On.ROOT_CLICK]: ({commit}, root) => {
        commit(Do.ADD_TO_PATH, root);
    },

    [On.SEARCH]: _.debounce(
        async function ({commit}, term) {
            commit(Do.UPDATE_RESULTS, await trunks.search(term));
            commit(Do.UPDATE_SEARCHING, false);
        },
        DEBOUNCE_DELAY),

    [On.TERM_CHANGE]: ({commit, dispatch}, term) => {
        commit(Do.UPDATE_TERM, term);
        commit(Do.UPDATE_SEARCHING, true);
        commit(Do.CLEAR_RESULTS);
        return dispatch(On.SEARCH, term);
    },
    [On.TRUNK_CLOSE]: ({commit}) => {
        commit(Do.CLOSE_TRUNK);
    },

    [On.OPEN_TREE_CLICK]: async ({commit}, trunk) => {
        let tree = await trunks.get(trunk._id);
        commit(Do.OPEN_TREE, tree);
        commit(Do.CLEAR_SEARCH);
    },

};
