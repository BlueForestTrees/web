import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import _ from 'lodash';
import * as To from '../services/mapper';

Vue.use(Vuex);

const state = {
    tree: null,
    path: null,
    linkEdit: null,
    addingSeed: false,
    search: {
        term: null,
        results: null,
        searching: false
    },
    dialogs: {
        create: {
            visible:false,
            data:{
                name:null
            }
        }
    }
};

const getters = {
    searchOccur(state) {
        return (state.search.term && !state.search.searching && !!state.search.results);
    },
    noResults(state) {
        return _.isEmpty(state.search.results);
    },
    hasResults(state, getters) {
        return !!(getters.searchOccur && !getters.noResults);
    },
    exactMatch(state) {
        return !!_.find(state.search.results, {name: state.search.term});
    },
    allowCreate(state, getters) {
        return !!(getters.searchOccur && (getters.noResults || !getters.exactMatch));
    },
    trunk(state) {
        return _.first(state.path);
    },
    seed(state) {
        return _.last(state.path);
    },
    isCurrentTrunk() {
        return (trunk) => trunk._id === this.$store.getters.trunk._id;
    },
    tank(state, getters) {
        if(!getters.trunk) return undefined;
        return To.tank(getters.trunk);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;