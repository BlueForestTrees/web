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
import tankActions from "./actions/tankActions";



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
        ...trunkActions,
        ...tankActions
    }
});

export default store;