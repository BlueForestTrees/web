import {ON_SEARCH_TERM_CHANGE} from 'mutations'
import {DEBOUNCE_DELAY} from 'const'
import api from 'api'
import _ from 'lodash'

const state = {
    term: "e",
    results: []
};

const noResults = state => {
    return state.results.length === 0 && state.term.length > 0;
};

const doSearch = _.debounce(
    async function ({state}, term) {
        if (term !== state.term) {
            state.term = term;
            state.results = [];
            if (term.length > 0) {
                state.results = await api.search(term);
            }
        }
    }, DEBOUNCE_DELAY);


export default {
    namespaced: true,
    state: state,
    getters: {
        noResults: noResults
    },
    actions: {
        [ON_SEARCH_TERM_CHANGE]: doSearch
    }
}

