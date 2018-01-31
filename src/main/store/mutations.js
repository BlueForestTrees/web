import Vue from 'vue'
import {NONE} from "../services/const";
import Do from "../const/do";
import {createDialog, tree} from "./state"

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
    [Do.CLOSE_TREE]: (state) => {
        state.compareTo = null;
        state.tree = tree();
    },
    [Do.INIT_TREE]: (state, {tree, _id}) => {
        Vue.set(tree, "_id", _id);
    },


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
    [Do.SHOW_DIALOG]: (state, {dialog, data}) => {

        if (!data) {
            cleanDialog(state, dialog);
        } else {
            updateDialog(state, {dialog, data});
        }

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


    [Do.CLEAR_COMPARE_TO]: (state) => {
        state.compareTo = null;
    },
    [Do.RENAME_TRUNK]: (state, rename) => {
        Vue.set(rename.trunk, "name", rename.name);
    },

    [Do.SWAP_LEFT_RIGHT]: state => {
        const left = state.tree;
        const right = state.compareTo;

        Vue.set(state, "tree", right);
        Vue.set(state, "compareTo", left);
    },
    [Do.UPSERT_QUANTITY]: (state, {trunk, quantity}) => {
        Vue.set(trunk, "quantity", quantity);
    },


    [Do.ADD_FACETS]: (state, {tree, facets}) => {
        if (!tree.facets) {
            Vue.set(tree, "facets", facets);
        } else {
            tree.facets.facets.push(facets);
        }
    },
    [Do.SET_TRUNK]: (state, {tree, trunk}) => {
        Vue.set(tree, "trunk", trunk);
    },
    [Do.OPEN_COMPARE_TO]: (state, value) => {
        state.compareTo = value;
    },
    [Do.SET_ROOTS]: (state, {tree, roots}) => {
        Vue.set(tree, "roots", roots);
    },
    [Do.ADD_ROOTS]: (state, {tree, roots}) => {
        tree.roots.items.push(...roots);
    },

    [Do.ADD_FACET]: (state, {tree, facet}) => {
        if (!tree.facets) {
            Vue.set(tree, "facets", [facet]);
        } else {
            tree.facets.push(facet);
        }
    },

    [Do.DELETE_FACETS]: (state, {tree, toDelete}) => {
        if (tree.facets) {
            _.forEach(toDelete, facet => tree.facets.splice(tree.facets.indexOf(facet), 1));
        }
    },
    [Do.DELETE_ROOT]: (state, {tree, root}) => {
        if (tree.roots) {
            tree.roots.items.splice(tree.roots.items.indexOf(root), 1);
        }
    }

};