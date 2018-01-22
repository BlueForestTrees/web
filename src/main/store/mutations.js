import Vue from 'vue'
import {NONE} from "../services/const";
import Do from "../const/do";
import {createDialog} from "./state"

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
        console.error(`state not found : state.dialogs['${dialog}']`);
    }
};
const updateDialogField = (state, {dialog, data}) => {
    if (state.dialogs[dialog]) {
        _.forEach(data, (value, key) => {
            state.dialogs[dialog].data[key] = value;
        });
    } else {
        console.error(`state not found : state.dialogs['${dialog}']`);
    }
};
const cleanDialog = (state, dialog) => {
    updateDialog(state, {dialog, data: createDialog(dialog)});
};


export default {

    [Do.UPDATE_GRANDEURS]: (state, grandeurs) => {
        state.grandeurs = grandeurs;
        state.labelsGrandeurs = Object.keys(grandeurs);
        state.units = _.chain(grandeurs)
            .values()
            .flatten()
            .keyBy('shortname')
            .value();
    },

    [Do.SHOW_FACET_ENTRY_DIALOG]: state => {
        state.dialogs2.facetEntryDialog.visible = true;
    },
    [Do.SHOW_DIALOG]: (state, dialog) => {
        cleanDialog(state, dialog);
        updateDialogVisibility(state, {dialog, visible: true});
    },
    [Do.UPDATE_DIALOG_DATA]: (state, {dialog, data}) => {
        updateDialog(state, {dialog, data});
    },
    [Do.UPDATE_DIALOG_VISIBILITY]: (state, {dialog, visible}) => {
        updateDialogVisibility(state, {dialog, visible});
    },
    [Do.CLEAR_DIALOG_DATA]: (state, dialog) => {
        cleanDialog(state, dialog);
    },





    [Do.CLEAR_RESULTS]: state => {
        state.search.results = [];
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.results = null;
    },




    [Do.OPEN_COMPARE_TO]: (state, value) => {
        state.compareTo = value;
    },
    [Do.CLEAR_COMPARE_TO]: (state) => {
        state.compareTo = null;
    },
    [Do.OPEN_TREE]: (state, value) => {
        state.tree = value;
    },
    [Do.RENAME_TREE]: (state, {tree, name}) => {
        Vue.set(tree, "name", name);
    },
    [Do.CLOSE_TREE]: (state) => {
        state.compareTo = null;
        state.tree = null;
    },

    [Do.SWAP_LEFT_RIGHT]: state => {
        const left = state.tree;
        const right = state.compareTo;

        Vue.set(state, "tree", right);
        Vue.set(state, "compareTo", left);
    },
    [Do.UPSERT_PRICE]: (state, {tree, price}) => {
        Vue.set(tree, "price", price);
    },
    [Do.UPSERT_QUANTITY]: (state, {tree, quantity}) => {
        Vue.set(tree, "quantity", quantity);
    },








    [Do.ADD_FACET]: (state, {tree, facet}) => {
        if (!tree.facets) {
            Vue.set(tree, "facets", [facet]);
        } else {
            tree.facets.push(facet);
        }
    },

    [Do.DELETE_FACETS]: (state, {tree, facets}) => {
        if (tree.facets) {
            _.forEach(facets, facet => tree.facets.splice(tree.facets.indexOf(facet), 1));
        }
    },
    [Do.DELETE_ROOT]: (state, {tree, root}) => {
        if (tree.roots) {
            tree.roots.splice(tree.roots.indexOf(root), 1);
        }
    }

};