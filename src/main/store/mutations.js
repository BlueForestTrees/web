import * as Do from "./mutationKeys";
import Vue from 'vue'

export default {
    [Do.ADD_TO_PATH]: (state, root) => {
        state.path.push(root);
    },
    [Do.ADD_SEED]: (state, {root, seed}) => {
        if(!root.roots){
            Vue.set(root,'roots', []);
        }
        root.roots.push(seed);
    },
    [Do.CHANGE_PATH_INDEX]: (state, idx) => {
        state.path.splice(idx+1);
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.results = [];
    },
    [Do.CLEAR_RESULTS]: state => {
        state.search.results = [];
    },
    [Do.CLOSE_TRUNK]: (state) => {
        state.path = null;
    },
    [Do.OPEN_TREE]: (state, value) => {
        state.path = [value];
    },
    [Do.UPDATE_TERM]: (state, value) => {
        state.search.term = value;
    },
    [Do.UPDATE_RESULTS]: (state, value) => {
        state.search.results = value;
    },
    [Do.UPDATE_SEARCHING]: (state, value) => {
        state.search.searching = value;
    },
};