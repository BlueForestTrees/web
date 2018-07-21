import On from "../../const/on";
import api from "../../rest/api";
import {idQuantity, transportQuantity, trunkyAll} from "../../services/calculations";
import router from "../../router/router";
import {GO} from "../../const/go";
import Do from "../../const/do";

//on détecte que l'objet est à charger en se basant arbitrairement sur le champ branches
const needRefresh = (basketTree, requestedTree) => !basketTree.branches;

export default {
    [On.GO_TREE]: ({commit, state}, {_id, qt, unit, trunk}) => {
        if (qt && unit) {
            router.push({name: GO.QTREE, params: {_id, qt, unit}});
        } else if (trunk && trunk.quantity) {
            router.push({name: GO.QTREE, params: {_id, qt: trunk.quantity.qt, unit: trunk.quantity.unit}});
        } else {
            router.push({name: GO.TREE, params: {_id}});
        }
    },
    [On.LOAD_IDQTUNIT]: async ({dispatch}, {_id, qt, unit}) => dispatch(On.LOAD_OPEN_TREE, ({_id, trunk: {quantity: {qt, unit}}})),
    [On.LOAD_OPEN_TREE]: async ({getters, dispatch, commit}, treeToLoad) => {
        const _id = treeToLoad._id;
        const basketItem = getters.basketItem(_id);
        if (basketItem && !needRefresh(basketItem, treeToLoad)) {
            return basketItem;
        } else {
            await dispatch(On.LOAD_TREE, treeToLoad);
            await dispatch(On.ADD_TO_BASKET, [treeToLoad]);
            commit(Do.OPEN_TREE, treeToLoad);
        }
    },

    [On.LOAD_TREE]: ({commit, state, dispatch}, treeToLoad) =>
        dispatch(On.LOAD_TRUNK, treeToLoad)
            .then(() =>
                Promise.all([
                    dispatch(On.LOAD_ROOTS, treeToLoad),
                    dispatch(On.LOAD_TANK, treeToLoad),
                    dispatch(On.LOAD_FACETS, treeToLoad),
                    dispatch(On.LOAD_IMPACTS, treeToLoad),
                    dispatch(On.LOAD_IMPACTS_TANK, treeToLoad),
                    dispatch(On.LOAD_BRANCHES, treeToLoad)
                ])),

    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) =>
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree)),

    [On.SEARCH_TREE]: async ({commit}, query) =>
        trunkyAll(await api.goSearch(query)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) =>
        dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({dispatch}, tree) =>
        api.deleteTrunk(tree._id)
            .then(() => dispatch(On.REMOVE_FROM_BASKET, [tree])),

    [On.ADD_TRANSPORT]: async ({dispatch}, {tree, item, transport}) =>
        await dispatch(On.LINK, {
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
        })

}