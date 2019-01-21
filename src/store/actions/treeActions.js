import Vue from 'vue'
import On from "../../const/on"
import api from "../../rest/api"
import {applyAspectCoef, applyRessourceCoef, coefFromTrunkToSelection, createStringObjectId, totalQt, transportQuantity, treefyAll, treeTotalQt} from "../../services/calculations"
import {bqtGToQtUnit, baseQt} from "unit-manip"
import router from "../../router/router"
import {GO} from "../../const/go"
import Do from "../../const/do"
import {DAMAGE, FACET, IMPACT} from "../../const/attributesTypes"
import {allFragments, OWNER} from "../../const/fragments"


//on détecte que l'objet est à charger en se basant arbitrairement sur le champ branches
const needRefresh = basketTree => !basketTree.branches

export default {
    [On.GO_CREATE_TREE]: () => router.push({name: GO.CREATE_TREE}),
    [On.GO_CREATE_INFO]: () => router.push({name: GO.CREATE_INFO}),

    [On.GO_ANY]: ({dispatch}, item) => item.repeted ? dispatch(On.GO_SELECTION, item) : dispatch(On.GO_TREE, item),

    [On.GO_SELECTION]: ({}, selection) => router.push({name: GO.SELECTION, params: {_id: selection._id}}),

    [On.GO_TREE]: ({commit, getters, dispatch}, tree) => {
        dispatch(On.UNSELECT)
        const dest = tree ?
            {_id: tree._id, bqt: tree.trunk.quantity.bqt}
            :
            getters.basketArray[0] ?
                {_id: getters.basketArray[0]._id, bqt: getters.basketArray[0].trunk.quantity.bqt}
                :
                null

        commit(Do.CLOSE_TREE)

        if (dest) {
            return router.push({name: GO.TREE, params: dest})
        } else {
            return router.push({name: GO.TREE_EMPTY})
        }
    },

    [On.LOAD_SELECTION]: async ({dispatch}, {_id, fragments}) => {
        const sel = await api.getSelection(_id)
        const tree = await dispatch(On.LOAD_OPEN_TREE, {_id: sel.trunkId, bqt: totalQt(sel), fragments})
        tree.selection = sel
        return tree
    },

    [On.LOAD_OPEN_TREE]: async ({state, dispatch, commit}, {_id, bqt, fragments = allFragments}) =>
        dispatch(On.LOAD_TREE, {_id, bqt, fragments})
            .then(tree => {
                commit(Do.OPEN_TREE, tree)
                return tree
            }),

    [On.LOAD_TREE]: ({commit, state, dispatch}, {_id, bqt = 1, fragments = allFragments}) => {
        const basketItem = state.basket[_id]
        if (basketItem && !needRefresh(basketItem)) {
            return basketItem
        } else {
            const tree = {_id}
            dispatch(On.UPDATE_TREE, {tree, bqt, fragments})
            dispatch(On.ADD_TO_BASKET, [tree])
            return tree
        }
    },

    [On.UPDATE_TREES]: ({dispatch}, {trees, fragments = allFragments}) => {
        return Promise.all(trees.map(tree => dispatch(On.UPDATE_TREE, {tree, bqt: treeTotalQt(tree), fragments})))
    },
    [On.UPDATE_TREE]: ({dispatch}, {tree, bqt = 1, fragments = allFragments}) => {
        tree.promises = {}
        for (let i = 0; i < fragments.length; i++) {
            if (fragments[i] !== OWNER) {
                tree.promises[fragments[i]] = dispatch(On.load(fragments[i]), {_id: tree._id, bqt}).then(fragment => Vue.set(tree, fragments[i], fragment))
            } else {
                tree.promises.owner = tree.promises.trunk.then(trunk => dispatch(On.LOAD_USER, trunk.oid).then(owner => Vue.set(tree, "owner", owner)))
            }
        }
        return tree.promises.all = Promise.all(Object.values(tree.promises))
    },


    [On.SEARCH_TREE]: async ({commit}, query) => treefyAll(await api.searchTrunk(query)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) =>
        dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({dispatch}, tree) => {
        const promises = {}
        promises.trunk = api.deleteTrunk(tree._id)
        dispatch(On.REMOVE_FROM_BASKET, [tree])
        return promises
    },

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

    [On.APPLY_SELECTION]: ({dispatch}, {tree, selection}) => {
        const coef = coefFromTrunkToSelection(selection, tree)
        Vue.set(tree, "selection", {...selection, trunkId: tree._id})
        dispatch(On.APPLY_QUANTITY_COEF, {tree, coef})
    },

    [On.SAVE_SELECTION]: ({dispatch}, {tree, selection}) => {
        const newSelection = {trunkId: tree._id, ...selection}
        if (tree.selection) {
            newSelection._id = tree.selection._id
            api.updateSelection(newSelection)
        } else {
            newSelection._id = createStringObjectId()
            api.createSelection(newSelection)
        }
    },

    [On.LOAD_SELECTIONS]: ({}, {oid}) => api.selectionOf(oid)
}