import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import state from './state';
import getters from './getters';
import appActions from "./actions/appActions";
import compareToActions from "./actions/compareToActions";
import facetActions from "./actions/facetActions";
import facetEntryActions from "./actions/facetEntryActions";
import rootActions from "./actions/rootActions";
import treeActions from "./actions/treeActions";
import trunkActions from "./actions/trunkActions";



Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions: {
        ...appActions,
        ...compareToActions,
        ...facetActions,
        ...facetEntryActions,
        ...rootActions,
        ...treeActions,
        ...trunkActions
    }
});

export default store;