import * as Do from "./keys";
import {DEBOUNCE_DELAY} from "../services/const";
import trunks from "../services/trunks";
import _ from 'lodash';

export default {
    [Do.UPDATE_TERM]: ({commit, dispatch}, term) => {
        commit(Do.UPDATE_TERM, term);
        commit(Do.UPDATE_SEARCHING, true);
        commit(Do.CLEAR_RESULTS);
        dispatch(Do.SEARCH, term);
    },

    [Do.SEARCH]: _.debounce(
        async function ({commit}, term) {
            commit(Do.UPDATE_RESULTS, await trunks.search(term));
            commit(Do.UPDATE_SEARCHING, false);
        },
        DEBOUNCE_DELAY),

    [Do.CREATE_TRUNK]: async ({commit, state, dispatch}, term) => {
        dispatch(Do.SET_TRUNK, await trunks.create({name: term}));
        commit(Do.CLEAR_SEARCH);
    },

    [Do.LOAD_TRUNK]: async ({state, commit, dispatch}, trunk) => {
        dispatch(Do.SET_TRUNK, await trunks.get(trunk._id));
    },

    [Do.SET_TRUNK]: async ({state, commit, dispatch}, trunk) => {
        commit(Do.SET_TRUNK, trunk);
        commit(Do.CLEAR_SEARCH);
    },


    [Do.SELECT_ROOT]: async ({commit, dispatch}, root)=>{
        const trunk = getters.trunk;
        await trunks.link({trunkId: trunk._id, rootId: root._id});
        commit(Do.SELECT_ROOT, root);
        commit(Do.CLEAR_SEARCH);
    },

    [Do.CLOSE_TRUNK]: ({commit}) => {
        commit(Do.CLOSE_TRUNK);
    }
};