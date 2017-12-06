import * as Do from 'mutations'
import {DEBOUNCE_DELAY} from 'const'
import api from 'api'
import _ from 'lodash'
import {toTrunk} from 'mapper'

const state = {
    term: "",
    results: [],
    selectedTrunk: null
};

const getters = {
    canCreate: state => state.results.length === 0 && state.term.length > 0
};

const actions = {
    [Do.CREATE]: async ({commit}, value) => {
        commit(Do.CHANGE_SELECTED_TRUNK, await api.create(toTrunk(value)));
    },
    [Do.CHANGE_SELECTED_TRUNK_ID]: async ({commit}, value) => {
        commit(Do.CHANGE_SELECTED_TRUNK, await api.get(value));
    },
    [Do.CHANGE_TERM]: _.debounce(
        async function ({commit, state}, value) {
            if (value !== state.term) {
                commit(Do.CHANGE_TERM, value);
                commit(Do.CLEAR_RESULTS);
                if (value.length > 0) {
                    commit(Do.CHANGE_RESULTS, await api.search(value));
                }
            }
        }, DEBOUNCE_DELAY)
};

const mutations = {
    [Do.CHANGE_TERM]: (state, value) => {
        state.term = value;
    },
    [Do.CHANGE_RESULTS]: (state, value) => {
        state.results = value;
    },
    [Do.CLEAR_RESULTS]: state => {
        state.results = [];
    },
    [Do.CHANGE_SELECTED_TRUNK]: (state, value) => {
        state.selectedTrunk = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}

