import Vue from 'vue'
import On from "../../const/on"
import api from "../../rest/api"
import {applyAspectCoef, applyRessourceCoef, createStringObjectId, transportQuantity, treefyAll} from "../../services/calculations"
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
    [On.GO_CREATE_PUB]: () => router.push({name: GO.CREATE_PUB}),
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

    [On.LOAD_OPEN_TREE]: async ({state, dispatch, commit}, {_id, bqt, fragments = allFragments}) =>
        dispatch(On.LOAD_TREE, {_id, bqt, fragments})
            .then(tree => {
                commit(Do.OPEN_TREE, tree)
                return tree
            }),

    [On.LOAD_TREE]: ({commit, state, dispatch}, {_id, bqt = 1, fragments = allFragments}) => {
        const basketItem = state.basket[_id]
        let tree = null
        if (basketItem && !needRefresh(basketItem)) {
            tree = basketItem
        } else {
            tree = {_id}
            tree.promises = {}

            for (let i = 0; i < fragments.length; i++) {
                if (fragments[i] !== OWNER) {
                    tree.promises[fragments[i]] = dispatch(On.load(fragments[i]), {_id, bqt}).then(fragment => Vue.set(tree, fragments[i], fragment))
                } else {
                    tree.promises.owner = tree.promises.trunk.then(trunk => dispatch(On.LOAD_USER, trunk.oid).then(owner => Vue.set(tree, "owner", owner)))
                }
            }

            tree.promises.all = Promise.all(Object.values(tree.promises))
            dispatch(On.ADD_TO_BASKET, [tree])
        }
        return tree
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
    [On.APPLY_QUANTITY_COEF]: ({dispatch}, {tree, coef}) => {
        applyRessourceCoef(coef, [tree])
        applyRessourceCoef(coef, tree.roots)
        applyRessourceCoef(coef, tree.tank)
        applyRessourceCoef(coef, tree.branches)

        applyAspectCoef(coef, tree.impacts)
        applyAspectCoef(coef, tree.damages)
        applyAspectCoef(coef, tree.facets)
        applyAspectCoef(coef, tree.impactsTank)
        applyAspectCoef(coef, tree.damagesTank)

        // dispatch(On.CHANGE_COMPARE_QUANTITY, {tree, coef})
    },

    [On.CHANGE_QUANTITY]: ({dispatch}, {tree, quantity}) => {
        let coef = quantity.bqt / tree.trunk.quantity.bqt
        console.log(`CHANGE_QUANTITY x${coef} `, quantity)
        Vue.set(tree, "selection", null)
        dispatch(On.APPLY_QUANTITY_COEF, {tree, coef})
    },

    [On.CHANGE_SELECTION]: ({dispatch}, {tree, selection}) => {
        let coef = (selection.duree.bqt / selection.freq.bqt) * selection.quantity.bqt / tree.trunk.quantity.bqt
        console.log(`CHANGE_SELECTION x${coef} `, selection)
        Vue.set(tree, "selection", selection)
        dispatch(On.APPLY_QUANTITY_COEF, {tree, coef})
    }
}