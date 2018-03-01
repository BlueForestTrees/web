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
import impactActions from "./actions/impactActions";
import impactEntryActions from "./actions/impactEntryActions";
import branchActions from "./actions/branchActions";



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
        ...impactActions,
        ...impactEntryActions,
        ...rootActions,
        ...treeActions,
        ...trunkActions,
        ...tankActions,
        ...branchActions
    }
});

export default store;