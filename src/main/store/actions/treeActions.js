import Do from "../../const/do";
import On from "../../const/on";
import api from "../../rest/api";
import {trunkyAll} from "../../services/calculations";

export default {

    [On.INVALIDATE_TRUNK]: async ({dispatch, state}) => {
        return dispatch(On.LOAD_OPEN_TREE, state.tree);
    },
    [On.LOAD_OPEN_TREE]: async ({commit, state, dispatch}, {_id}) => {
        dispatch(On.LOAD_TREE, {_id})
            .then(tree => commit(Do.INIT_TREE, tree));
    },
    [On.LOAD_TREE]: async ({commit, state, dispatch}, {_id}) => {
        const tree = {_id};

        await dispatch(On.LOAD_TRUNK, tree)
            .then(() => Promise.all([
                dispatch(On.LOAD_ROOTS, tree),
                dispatch(On.LOAD_TANK, tree),
                dispatch(On.LOAD_FACETS, tree),
                dispatch(On.LOAD_IMPACTS, tree),
                dispatch(On.LOAD_IMPACTS_TANK, tree),
                dispatch(On.LOAD_BRANCHES, tree)
            ]));

        return tree;
    },
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name, grandeur}) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TRUNK, {name, grandeur}));
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree));
    },

    [On.SEARCH_TREE]: async ({commit}, {term}) => trunkyAll(await api.search(term)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) => dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({commit}, tree) =>
        api.deleteTrunk(tree._id)
            .then(() => commit(Do.CLOSE_TREE))

}