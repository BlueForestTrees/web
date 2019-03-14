import Vue from 'vue'
import On from "../../const/on"
import api from "../../rest/api"
import {coefFromTrunkToSelection, createStringObjectId, selectionBqt, transportQuantity, treefyAll, treeBqt} from "../../services/calculations"
import {bqtGToQtUnit, baseQt} from "unit-manip"
import router from "../../router/router"
import {GO} from "../../const/go"
import Do from "../../const/do"
import {DAMAGE, FACET, IMPACT} from "../../const/attributesTypes"
import {allFragments, OWNER, TRUNK} from "../../const/fragments"
import {deleteCatch} from "./commons"

export default {
    [On.GO_CREATE_TREE]: ({}) => {
        router.push({name: GO.CREATE_TREE})
    },
    [On.GO_CREATE_INFO]: () => router.push({name: GO.CREATE_INFO}),

    [On.GO_ANY]: ({dispatch}, item) =>
        item.trunkId ?
            dispatch(On.GO_SELECTION, item)
            :
            item.path ?
                router.push({name: GO.INFO, params: {path: item.path}})
                :
                dispatch(On.GO_TREE, item),

    [On.GO_SELECTION]: ({}, selection) => router.push({name: GO.SELECTION, params: {_id: selection._id}}),

    [On.GO_TREE]: ({commit, getters, dispatch}, tree) => {
        const dest = tree ?
            {_id: tree._id, bqt: tree.trunk.quantity.bqt}
            :
            null

        if (dest) {
            return router.push({name: GO.TREE, params: dest})
        } else {
            return router.push({name: GO.TREE_EMPTY})
        }
    },

    [On.LOAD_SELECTION]: async ({dispatch}, {_id, fragments}) => dispatch(On.LOAD_SELECTION_TREE, {selection: await api.getSelection(_id), fragments}),


    [On.LOAD_TREES]: ({dispatch}, {treesIds, fragments = allFragments}) => {
        return Promise.all(treesIds.map(_id => dispatch(On.LOAD_TREE, {_id, fragments})))
    },

    [On.UPDATE_TREES]: ({dispatch}, {trees, fragments = allFragments}) => {
        return Promise.all(trees.map(tree => dispatch(On.UPDATE_TREE, {tree, fragments})))
    },


    [On.LOAD_OPEN_TREE]: async ({state, dispatch, commit}, {_id, bqt, fragments = allFragments}) =>
        dispatch(On.LOAD_TREE, {_id, bqt, fragments})
            .then(tree => {
                commit(Do.OPEN_TREE, tree)
                return tree
            }),


    [On.LOAD_SELECTION_TREE]: async ({dispatch}, {selection, fragments}) =>
        dispatch(On.LOAD_TREE, {_id: selection.trunkId, bqt: selectionBqt(selection), fragments})
            .then(tree => {
                tree.selection = selection
                return tree
            }),


    [On.LOAD_TREE]: ({commit, state, dispatch}, {_id, bqt = 1, fragments = allFragments}) => {
        const tree = {_id}
        const all = dispatch(On.UPDATE_TREE, {tree, bqt, fragments})
        tree.promises.all = all
        dispatch(On.ADD_TO_BASKET, tree)
        return tree
    },
    [On.UPDATE_TREE]: ({dispatch}, {tree, bqt = treeBqt(tree), fragments = allFragments}) => {

        tree.promises = {}
        for (let i = 0; i < fragments.length; i++) {
            if (fragments[i] !== OWNER) {
                tree.promises[fragments[i]] = dispatch(On.load(fragments[i]), {_id: tree._id, bqt}).then(fragment => Vue.set(tree, fragments[i], fragment))
            } else {
                tree.promises.owner = tree.promises.trunk.then(trunk => dispatch(On.LOAD_USER, trunk.oid).then(owner => Vue.set(tree, "owner", owner)))
            }
        }

        return Promise.all(Object.values(tree.promises))
    },


    [On.SEARCH_TREE]: async ({commit}, query) => treefyAll(await api.searchTrunk(query)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) =>
        dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({dispatch}, tree) =>
        api.deleteTrunk(tree._id)
            .then(() => dispatch(On.REMOVE_FROM_BASKET, [tree])),

    [On.DELETE_OPENED_TREE]: ({commit, dispatch, state}) =>
        deleteCatch(dispatch, dispatch(On.DELETE_TREE, state.tree)
            .then(() => commit(Do.CLOSE_TREE))
            .then(() => dispatch(On.GO_HOME))
            .then(() => dispatch(On.SNACKBAR, {text: "1 élement supprimé"}))),

    [On.ADD_TRANSPORT]: ({dispatch}, {tree, item, transport}) => dispatch(On.CREATE_ROOT, {
        _id: createStringObjectId(),
        trunkId: tree._id,
        rootId: transport._id,
        relativeTo: ({
            _id: item._id,
            bqt: baseQt(transport.quantity)
        }),
        bqt: transportQuantity(bqtGToQtUnit(item.trunk.quantity), transport.quantity),
    }),
    [On.CREATE_LINK]: ({dispatch}, {_id, parent, child, bqt}) => {
        if (!child.type) {
            return api.postRoot({_id, trunkId: parent._id, rootId: child._id, bqt})
        } else {
            switch (child.type) {
                case IMPACT:
                    return api.postImpact(_id, parent._id, child._id, bqt)
                case DAMAGE:
                    return api.postDamage(_id, parent._id, child._id, bqt)
                case FACET:
                    return api.postFacet(_id, parent._id, child._id, bqt)

            }
        }
    },

    [On.SAVE_APPLY_SELECTION]: ({dispatch}, {tree, selection}) => {
        let update
        if (tree.selection && tree.selection._id) {
            selection._id = tree.selection._id
            update = true
        } else {
            selection._id = createStringObjectId()
            update = false
        }
        return (update ? api.updateSelection(selection) : api.createSelection(selection))
            .then(() => dispatch(On.APPLY_SELECTION, {tree, selection}))
            .then(() => dispatch(On.SNACKBAR, {"text": `Favoris ${update ? "mis à jour" : "crée"}`}))
    },

    [On.APPLY_SELECTION]: ({dispatch}, {tree, selection}) => {
        const coef = coefFromTrunkToSelection(selection, tree)
        Vue.set(tree, "selection", {...selection, trunkId: tree._id})
        dispatch(On.APPLY_COEF_TO_TREE, {tree, coef})
    },

    [On.LOAD_SELECTIONS]: ({}, {oid}) => api.selectionOf(oid)

}