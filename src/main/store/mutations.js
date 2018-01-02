import Vue from 'vue'
import {NONE} from "../services/const";
import {Do, Dial} from "./keys";
import {dialogs} from "./state"

const updateDialogVisibility = (state, {dialog, visible}) => {
    if (state.dialogs[dialog]) {
        state.dialogs[dialog].visible = visible;
    } else {
        console.error(`dialog ${dialog} not found`);
    }
};
const updateDialog = (state, {dialog, data}) => {
    if (state.dialogs[dialog]) {
        state.dialogs[dialog].data = data;
    } else {
        console.error(`dialog ${dialog} not found`);
    }
};



const clearTrunkDialogData = (state) => {
    updateTrunkDialogData(state, dialogs[Dial.TRUNK]());
};
const updateTrunkDialogData = (state, data) => {
    updateDialog(state, {dialog: Dial.TRUNK, data});
};
const updateTrunkDialogVisibility = (state, visible) => {
    updateDialogVisibility(state, {dialog:Dial.TRUNK, visible:visible});
};
const clearFacetDialogData = (state) => {
    updateFacetDialogData(state, dialogs[Dial.FACET]());
};
const updateFacetDialogData = (state, data) => {
    updateDialog(state, {dialog: Dial.FACET, data});
};
const updateFacetDialogVisibility = (state, visible) => {
    updateDialogVisibility(state, {dialog:Dial.FACET, visible:visible});
};


export default {

    [Do.LOAD_UNITS]: (state, units) => {
        state.units = units;
    },
    //DIALOG
    [Do.UPDATE_TRUNK_DIALOG_VISIBILITY]: (state, visible) => {
        if(visible){
            clearTrunkDialogData(state);
        }
        updateTrunkDialogVisibility(state, visible);
    },
    [Do.SHOW_TRUNK_DIALOG]: (state) => {
        clearTrunkDialogData(state);
        updateTrunkDialogVisibility(state, true);
    },
    [Do.HIDE_TRUNK_DIALOG]: (state) => {
        updateTrunkDialogVisibility(state, false);
    },
    [Do.UPDATE_TRUNK_DIALOG_DATA]: (state, data) => {
        updateTrunkDialogData(state, data);
    },
    [Do.UPDATE_FACET_DIALOG_VISIBILITY]: (state, visible) => {
        if(visible){
            clearFacetDialogData(state);
        }
        updateFacetDialogVisibility(state, visible);
    },
    [Do.SHOW_FACET_DIALOG]: (state) => {
        clearFacetDialogData(state);
        updateFacetDialogVisibility(state, true);
    },
    [Do.HIDE_FACET_DIALOG]: (state) => {
        updateFacetDialogVisibility(state, false);
    },
    [Do.UPDATE_FACET_DIALOG_DATA]: (state, data) => {
        updateFacetDialogData(state, data);
    },


    [Do.UPDATE]: (state, {data, key, value}) => {
        Vue.set(data, key, value);
    },
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
        state.search.results = null;
    },
    [Do.OPEN_TREE]: (state, value) => {
        state.path = [value];
        state.tree = value;
    },
    [Do.CLOSE_TREE]: (state) => {
        state.path = null;
        state.tree = null;
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

        let idx = _.findIndex(state.path, {_id: root._id});

        state.path.splice(idx, 1, root);

        idx++;

        for (; idx < state.path.length; idx++) {
            root = _.find(root.roots, {_id: state.path[idx]._id});
            state.path.splice(idx, 1, root);
        }

    },
    [Do.UPDATE_ADDING_SEED]: (state, value) => {
        state.addingSeed = value;
    },
    [Do.ADD_FACET]: (state, {tree, facet}) => {
        if (!tree.facets) {
            Vue.set(tree, "facets", [facet]);
        } else {
            tree.facets.push(facet);
        }
    }

};