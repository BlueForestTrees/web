import actions from './actions'
import mutations from './mutations'

const getters = {
    allowCreate(state) {
        return state.term && !state.searching
            && state.results && (state.results.length === 0);
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
