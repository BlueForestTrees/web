import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import _ from 'lodash';

Vue.use(Vuex);

const state = {
    search:{
        term: "",
        results: null,
        searching: false
    },
    path: null,
    seed: null
};

const getters = {
    trunk(state){
        return _.first(state.path);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;