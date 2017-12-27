import actions from './actions'
import mutations from './mutations'

const getters = {
    searchOccur(state) {
        return !!(state.term && !state.searching && !!state.results);
    },
    noResults(state) {
        return _.isEmpty(state.results);
    },
    hasResults(state, getters) {
        return !!(getters.searchOccur && !getters.noResults);
    },
    exactMatch(state) {
        return !!_.find(state.results, {name:state.term});
    },
    allowCreate(state, getters) {
        return !!(getters.searchOccur && (getters.noResults || !getters.exactMatch));
    }
};

const state = () => ({
    term: null,
    results: null,
    searching: false
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
