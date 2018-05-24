import Do from "../../const/do";
import On from "../../const/on";
import api from "../../rest/api";
import {trunkyAll} from "../../services/calculations";

export default {

    [On.LOAD_OPEN_TREE]: async ({commit, state, dispatch}, treeToLoad) => {
        await dispatch(On.LOAD_TREE, treeToLoad);
        commit(Do.ADD_TO_BASKET, treeToLoad);
        return treeToLoad;
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

    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name, grandeur}) =>
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TRUNK, {name, grandeur})),

    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) =>
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree)),

    [On.SEARCH_TREE]: async ({commit}, {term}) =>
        trunkyAll(await api.search(term)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) =>
        dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({commit}, tree) =>
        api.deleteTrunk(tree._id)
            .then(() => commit(Do.REMOVE_FROM_BASKET, tree))

}