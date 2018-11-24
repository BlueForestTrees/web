import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import appActions from "./actions/appActions"
import facetActions from "./actions/facetActions"
import facetEntryActions from "./actions/facetEntryActions"
import rootActions from "./actions/rootActions"
import treeActions from "./actions/treeActions"
import trunkActions from "./actions/trunkActions"
import tankActions from "./actions/tankActions"
import impactActions from "./actions/impactActions"
import impactEntryActions from "./actions/impactEntryActions"
import branchActions from "./actions/branchActions"
import branchMutations from "./mutation/branchMutations"
import dialogMutations from "./mutation/dialogMutations"
import facetMutation from "./mutation/facetMutation"
import impactMutations from "./mutation/impactMutations"
import tankMutations from "./mutation/tankMutations"
import treeMutations from "./mutation/treeMutations"
import trunkMutations from "./mutation/trunkMutations"
import rootMutations from "./mutation/rootMutations"
import basketMutations from "./mutation/basketMutations"
import userActions from "./actions/userActions"
import userMutation from "./mutation/userMutation"
import searchActions from "./actions/searchActions"
import basketActions from "./actions/basketActions"
import homeActions from "./actions/homeActions"
import snackbarActions from "./actions/snackbarActions"
import snackbarMutations from "./mutation/snackbarMutations"
import compareMutations from "./mutation/compareMutations"
import compareActions from "./actions/compareActions"
import categoriesActions from "./actions/categoriesActions"
import dialogActions from "./actions/dialogActions"
import navMutations from "./mutation/navMutations"
import messagesActions from "./actions/messagesActions"
import messagesMutations from "./mutation/messagesMutations"
import selectionMutations from "./mutation/selectionMutations"
import selectionActions from "./actions/selectionActions"
import grandeurActions from "./actions/grandeurActions"
import equivActions from "./actions/jeuActions"



Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    mutations:{
        ...basketMutations,
        ...branchMutations,
        ...compareMutations,
        ...dialogMutations,
        ...facetMutation,
        ...impactMutations,
        ...rootMutations,
        ...tankMutations,
        ...treeMutations,
        ...trunkMutations,
        ...userMutation,
        ...snackbarMutations,
        ...navMutations,
        ...messagesMutations,
        ...selectionMutations
    },
    actions: {
        ...selectionActions,
        ...messagesActions,
        ...appActions,
        ...equivActions,
        ...categoriesActions,
        ...basketActions,
        ...dialogActions,
        ...facetActions,
        ...grandeurActions,
        ...facetEntryActions,
        ...impactActions,
        ...impactEntryActions,
        ...rootActions,
        ...treeActions,
        ...trunkActions,
        ...tankActions,
        ...branchActions,
        ...userActions,
        ...snackbarActions,
        ...searchActions,
        ...homeActions,
        ...compareActions
    }
})

export default store