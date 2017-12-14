import * as Do from "./keys";

export default {
    [Do.UPDATE_TERM]: (state, value) => {
        state.search.term = value;
    },
    [Do.UPDATE_RESULTS]: (state, value) => {
        state.search.results = value;
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.results = [];
    },
    [Do.CLEAR_RESULTS]: state => {
        state.search.results = [];
    },
    [Do.UPDATE_SEARCHING]: (state, value) => {
        state.search.searching = value;
    },
    [Do.CLOSE_TRUNK]: (state) => {
        state.seed = state.path = null;
    },
    [Do.SET_TRUNK]: (state, value) => {
        state.path = [value];
        state.seed = value;
    },
    [Do.SELECT_ROOT]: (state, value) => {
        state.seed = value;
        state.path.push(value);
    },
    [Do.SELECT_SUB_TRUNK]: (state, index) => {
        state.seed = value;
        state.path.length = index + 1;
    }
};