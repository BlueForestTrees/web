import Vue from 'vue'
import Vuex from 'vuex'
import searchModule from './modules/search'
import {LIST_ALL, TRIGGER_PURGE, UPDATE_SELECTED_TRUNK} from "mutations";
import trunks from 'trunks';
import {CLOSE_TRUNK} from "./mutations";

Vue.use(Vuex);

const state = {
    listAll: null,
    selectedTrunk:null
};

const modules = {
    search: searchModule
};

const actions = {
    [TRIGGER_PURGE]: async ({dispatch}) => {
        await trunks.purge();
        await dispatch(LIST_ALL);
    },
    [LIST_ALL]: async ({commit}) => {
        commit(LIST_ALL, await trunks.all());
    },
    [CLOSE_TRUNK]: ({commit}) => {
        commit(UPDATE_SELECTED_TRUNK, null);
    }
};

const mutations = {
    [LIST_ALL]: (state, value) => {
        state.listAll = value;
    },
    [UPDATE_SELECTED_TRUNK]: (state, value) => {
        state.selectedTrunk = value;
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    modules,
    actions
});

export default store;