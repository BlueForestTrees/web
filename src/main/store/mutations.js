import Vue from 'vue'
import {NONE} from "../services/const";
import {Do} from "./keys";

export default {
    [Do.CLEAR_RESULTS]: state => {
        state.search.results = [];
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
    [Do.ADD_TO_PATH]: (state, root) => {
        state.path.push(root);
    },
    [Do.ADD_SEED]: (state, {root, seed}) => {
        if (!root.roots) {
            Vue.set(root, 'roots', []);
        }
        root.roots.push(seed);
    },
    [Do.CHANGE_PATH_INDEX]: (state, idx) => {
        state.path.splice(idx + 1);
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.results = [];
    },
    [Do.CLOSE_TREE]: (state) => {
        state.path = null;
    },
    [Do.OPEN_TREE]: (state, value) => {
        state.path = [value];
    },
    [Do.UPDATE_LINK_EDIT]: (state, value) => {
        state.linkEdit = value;
    },
    [Do.UPDATE_ROOT]: (state, {trunk, root}) => {
        const rootIdx = _.findIndex(trunk.roots, {_id: root._id});
        if (rootIdx !== NONE) {
            trunk.roots.splice(rootIdx, 1, root);
        }
    },
    [Do.UPDATE_QT]: (state, {trunk, qt}) => {
        Vue.set(trunk, "qt", qt);
    },
    [Do.UPDATE_PATH_ITEM]: (state, root) => {

        let idx = _.findIndex(state.path, {_id:root._id});

        state.path.splice(idx,1,root);

        idx++;

        for(; idx < state.path.length; idx++){
            root = _.find(root.roots, {_id:state.path[idx]._id});
            state.path.splice(idx,1,root);
        }

    },
    [Do.UPDATE_ADDING_SEED]: (state, value) => {
        state.addingSeed = value;
    }

};