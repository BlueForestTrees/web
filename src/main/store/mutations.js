import Vue from 'vue'
import {NONE} from "../services/const";
import {Do} from "../const/do";
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
const cleanDialog = (state, dialog) => {
    updateDialog(state, {dialog, data: createDialog(dialog)});
};


function lookups(state, lookup) {
    if(state.lookups[lookup]){
        return state.lookups[lookup];
    }else{
        console.error(`dialog ${dialog} not found`);
    }
}

export default {

    [Do.UPDATE_GRANDEURS]: (state, grandeurs) => {
        state.grandeurs = grandeurs;
        state.grandeursKeys = Object.keys(grandeurs);
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
        updateDialogVisibility(state, {dialog, visible:true});
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



    [Do.UPDATE_LOOKUP_TERM]: (state, {lookup, term}) => {
        lookups(state, lookup).term = term;
    },
    [Do.UPDATE_LOOKUP_SEARCHING]: (state, {lookup, searching}) => {
        lookups(state, lookup).searching = searching;
    },
    [Do.CLEAR_LOOKUP_SEARCH]: (state,lookup) => {
        lookups(state, lookup).term = null;
        lookups(state, lookup).results = null;
    },
    [Do.UPDATE_LOOKUP_RESULTS]: (state, {lookup, results}) => {
        lookups(state, lookup).results = results;
    },



    [Do.UPDATE_TERM]: (state, value) => {
        state.search.term = value;
    },
    [Do.UPDATE]: (state, {data, key, value}) => {
        Vue.set(data, key, value);
    },
    [Do.CLEAR_RESULTS]: state => {
        state.search.results = [];
    },
    [Do.UPDATE_RESULTS]: (state, value) => {
        state.search.results = value;
    },
    [Do.UPDATE_SEARCHING]: (state, value) => {
        state.search.searching = value;
    },
    [Do.CLEAR_SEARCH]: state => {
        state.search.term = null;
        state.search.results = null;
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






    [Do.OPEN_COMPARE_TO]: (state, value) => {
        state.compareTo = value;
    },
    [Do.CLEAR_COMPARE_TO]: (state) => {
        state.compareTo = null;
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
    [Do.UPSERT_PRICE]: (state, {tree, price}) => {
        Vue.set(tree, "price", price);
    },
    [Do.UPSERT_QUANTITY]: (state, {tree, quantity}) => {
        Vue.set(tree, "quantity", quantity);
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