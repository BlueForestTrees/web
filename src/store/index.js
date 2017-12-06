import Vue from 'vue'
import Vuex from 'vuex'
import searchModule from './modules/search'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    actions: {}
});

store.registerModule('search', searchModule);

export default store;