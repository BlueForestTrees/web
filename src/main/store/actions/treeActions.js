import Vue from 'vue'
import On from "../../const/on"
import api from "../../rest/api"
import {idQuantity, transportQuantity, trunkyAll} from "../../services/calculations"
import router from "../../router/router"
import {GO} from "../../const/go"
import Do from "../../const/do"

//on détecte que l'objet est à charger en se basant arbitrairement sur le champ branches
const needRefresh = basketTree => !basketTree.branches

export default {
    [On.GO_TREE]: ({commit, state}, tree) => {
        const _id = tree._id
        const bqt = tree.trunk.quantity.bqt
        return router.push({name: GO.TREE, params: {_id, bqt}})
    },
    
    [On.LOAD_OPEN_TREE]: async ({getters, dispatch, commit}, {_id, bqt}) => {
        const basketItem = getters.basketItem(_id)
        let tree = null
        if (basketItem && !needRefresh(basketItem)) {
            tree = basketItem
        } else {
            tree = await dispatch(On.LOAD_TREE, {_id, bqt})
        }
        commit(Do.OPEN_TREE, tree)
        return tree
    },
    
    [On.LOAD_TREE]: ({commit, state, dispatch}, {_id, bqt = 1}) => {
        const tree = {_id}
        tree.promises = {}
        tree.promises.trunk = dispatch(On.LOAD_TRUNK, {_id, bqt}).then(trunk => Vue.set(tree, "trunk", trunk))
        tree.promises.roots = dispatch(On.LOAD_ROOTS, {_id, bqt}).then(roots => Vue.set(tree, "roots", roots))
        tree.promises.branches = dispatch(On.LOAD_BRANCHES, {_id, bqt}).then(branches => Vue.set(tree, "branches", branches))
        tree.promises.impacts = dispatch(On.LOAD_IMPACTS, {_id, bqt}).then(impacts => Vue.set(tree, "impacts", impacts))
        tree.promises.impactsTank = dispatch(On.LOAD_IMPACTS_TANK, {_id, bqt}).then(impactsTank => Vue.set(tree, "impactsTank", impactsTank))
        tree.promises.all = Promise.all([tree.promises.trunk, tree.promises.roots, tree.promises.branches, tree.promises.impacts, tree.promises.impactsTank])
        // dispatch(On.LOAD_TANK, treeToLoad)
        // dispatch(On.LOAD_FACETS, treeToLoad)
        
        
        dispatch(On.ADD_TO_BASKET, [tree])
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
    
    [On.ADD_TRANSPORT]: ({dispatch}, {tree, item, transport}) => dispatch(On.LINK, {
        trunk: idQuantity(tree),
        root: {
            _id: transport._id,
            quantity: transportQuantity(tree.trunk.quantity, transport.quantity),
            relativeTo: ({
                _id: item._id,
                refqt: tree.trunk.quantity,
                disqt: transport.quantity
            })
        }
    }),
    
}