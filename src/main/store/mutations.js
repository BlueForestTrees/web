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
        state.path = null;
    },
    [Do.SET_TRUNK]: (state, value) => {
        state.path = [value];
    },
    [Do.ADD_ROOT]: (state, value) => {
        //TODO à la création d'un root, il faut ajouter dans roots du parent ET dans le path
        console.log(state.seed);
        state.seed.roots.push(value);
        state.path.push(value);
    },
    [Do.SPLICE_PATH]: (state, idx) => {
        state.path.splice(idx+1);
    }
};