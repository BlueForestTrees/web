import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import _ from 'lodash';

Vue.use(Vuex);

const state = {
    search:{
        term: null,
        results: null,
        searching: false
    },
    path: []
};

const getters = {
    trunk(state){
        return _.first(state.path);
    },
    seed(state){
        return _.last(state.path);
    },
    allowCreate(state){
        return !state.search.searching
        && state.search.results && state.search.results.length === 0
            && state.search.term;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;