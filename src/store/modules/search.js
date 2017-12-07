import * as Do from 'mutations'
import {DEBOUNCE_DELAY} from 'const'
import trunks from 'trunks'
import _ from 'lodash'
import {toTrunk} from 'mapper'

const state = {
    term: "",
    results: [],
    inputTrunk: null,
    searching: false
};

const getters = {
    canCreate: state => !state.searching && !!state.inputTrunk && state.results.length === 0 && state.term && state.term.length > 0
};

const actions = {
    [Do.UPDATE_TERM]: ({commit, dispatch}, value) => {
        commit(Do.UPDATE_TERM, value);
        commit(Do.UPDATE_INPUT_TRUNK, toTrunk(value));
        commit(Do.UPDATE_SEARCHING,true);
        dispatch(Do.SEARCH, value);
    },

    [Do.SEARCH]: _.debounce(
        async function ({commit}, value) {
            commit(Do.CLEAR_RESULTS);
            commit(Do.UPDATE_RESULTS, await trunks.search(value));
            commit(Do.UPDATE_SEARCHING,false);
        },
        DEBOUNCE_DELAY),

    [Do.CREATE]: async ({commit, state, dispatch}) => {
        const createdTrunk = await trunks.create(state.inputTrunk);
        commit(Do.UPDATE_SELECTED_TRUNK, createdTrunk);
        dispatch(Do.UPDATE_TERM, null);
    },

    [Do.UPDATE_SELECTED_TRUNK_ID]: async ({commit}, value) => {
        commit(Do.UPDATE_SELECTED_TRUNK, await trunks.get(value));
    }
};

const mutations = {
    [Do.UPDATE_TERM]: (state, value) => {
        state.term = value;
    },
    [Do.UPDATE_INPUT_TRUNK]: (state, value) => {
        state.inputTrunk = value;
    },
    [Do.UPDATE_RESULTS]: (state, value) => {
        state.results = _.sortBy(value, trunk => trunk.name);
    },
    [Do.CLEAR_RESULTS]: state => {
        state.results = [];
    },
    [Do.UPDATE_SEARCHING]: (state, value) => {
        state.searching = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}

