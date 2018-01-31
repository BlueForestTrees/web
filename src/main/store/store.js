import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import state from './state';
import getters from './getters';

import actionsMain from './actions/actionsMain';
import actionsLoading from "./actions/actionsLoading";
import actionsInit from "./actions/actionsInit";
import actionsPopulate from "./actions/actionsPopulate";

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions: {...actionsMain, ...actionsLoading, ...actionsInit,...actionsPopulate}
});

export default store;