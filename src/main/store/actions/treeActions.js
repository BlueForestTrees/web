import On from "../../const/on";
import api from "../../rest/api";
import {trunkyAll} from "../../services/calculations";
import router from "../../router/router";
import {GO} from "../../const/go";

//on détecte que l'objet est à charger en se basant arbitrairement sur le champ branches
const needRefresh = tree => !tree.branches;

export default {
    [On.GO_TREE]: ({commit, state}, item) => {
        router.push({name: GO.TREE, params: {_id: item._id}});
    },
    [On.LOAD_OPEN_TREE]: async ({getters, commit, state, dispatch}, treeToLoad) => {
        const _id = treeToLoad._id;
        const basketItem = getters.basketItem(_id);
        if (basketItem && !needRefresh(basketItem)) {
            return basketItem;
        } else {
            await dispatch(On.LOAD_TREE, treeToLoad);
            await dispatch(On.ADD_TO_BASKET, [treeToLoad]);
            return treeToLoad;
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

    [On.SEARCH_TREE]: async ({commit}, {term}) =>
        trunkyAll(await api.goSearch(term)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) =>
        dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({dispatch}, tree) =>
        api.deleteTrunk(tree._id)
            .then(() => dispatch(On.REMOVE_FROM_BASKET, [tree])),

}