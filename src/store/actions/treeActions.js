import Vue from 'vue'
import On from "../../const/on"
import api from "../../rest/api"
import {createStringObjectId, transportQuantity, trunkyAll} from "../../services/calculations"
import {bqtGToQtUnit, baseQt} from "unit-manip"
import router from "../../router/router"
import {GO} from "../../const/go"
import Do from "../../const/do"

//on détecte que l'objet est à charger en se basant arbitrairement sur le champ branches
const needRefresh = basketTree => !basketTree.branches

export default {
    [On.GO_CREATE_TREE]: () => router.push({name: GO.CREATE_TREE}),
    [On.GO_TREE]: ({commit, getters}, tree) => {
        const dest = tree ?
            {_id: tree._id, bqt: tree.trunk.quantity.bqt}
            :
            getters.basketArray[0] ?
                {_id: getters.basketArray[0]._id, bqt: getters.basketArray[0].trunk.quantity.bqt}
                :
                null

        if (dest) {
            return router.push({name: GO.TREE, params: dest})
        } else {
            return router.push({name: GO.TREE_EMPTY})
        }
    },

    [On.LOAD_OPEN_TREE]: async ({state, dispatch, commit}, {_id, bqt}) => {
        const tree = await dispatch(On.LOAD_TREE, {_id, bqt})
        commit(Do.OPEN_TREE, tree)
        return tree
    },

    [On.LOAD_TREE]: async ({commit, state, dispatch}, {_id, bqt = 1}) => {
        const basketItem = state.basket[_id]
        let tree = null
        if (basketItem && !needRefresh(basketItem)) {
            tree = basketItem
        } else {
            tree = {_id}
            tree.promises = {}
            tree.promises.trunk = dispatch(On.LOAD_TRUNK, {_id, bqt}).then(trunk => Vue.set(tree, "trunk", trunk) && trunk)
            tree.promises.owner = tree.promises.trunk.then(trunk => dispatch(On.LOAD_USER, trunk.oid).then(owner => Vue.set(tree, "owner", owner)))
            tree.promises.roots = dispatch(On.LOAD_ROOTS, {_id, bqt}).then(roots => Vue.set(tree, "roots", roots))
            tree.promises.branches = dispatch(On.LOAD_BRANCHES, {_id, bqt}).then(branches => Vue.set(tree, "branches", branches))
            tree.promises.impacts = dispatch(On.LOAD_IMPACTS, {_id, bqt}).then(impacts => Vue.set(tree, "impacts", impacts))
            tree.promises.damages = dispatch(On.LOAD_DAMAGES, {_id, bqt}).then(damages => Vue.set(tree, "damages", damages))
            tree.promises.impactsTank = dispatch(On.LOAD_IMPACTS_TANK, {_id, bqt}).then(impactsTank => Vue.set(tree, "impactsTank", impactsTank))
            tree.promises.damagesTank = dispatch(On.LOAD_DAMAGES_TANK, {_id, bqt}).then(damagesTank => Vue.set(tree, "damagesTank", damagesTank))
            tree.promises.facets = dispatch(On.LOAD_FACETS, {_id, bqt}).then(facets => Vue.set(tree, "facets", facets))
            tree.promises.tank = dispatch(On.LOAD_TANK, {_id, bqt}).then(tank => Vue.set(tree, "tank", tank))
            tree.promises.all = Promise.all([tree.promises.trunk, tree.promises.roots, tree.promises.branches, tree.promises.impacts, tree.promises.impactsTank, tree.promises.damages, tree.promises.damagesTank, tree.promises.facets, tree.promises.tank])
            dispatch(On.ADD_TO_BASKET, [tree])
        }
        return tree
    },

    [On.SEARCH_TREE]: async ({commit}, query) => trunkyAll(await api.searchTrunk(query)),

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

}