import Do from "../../const/do";
import On from "../../const/on";
import {trunky, trunkyAll} from "../../services/mapper";
import rest from "../../services/rest";

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
        await Promise.all([
            dispatch(On.LOAD_TRUNK, tree)
                .then(() => dispatch(On.LOAD_ROOTS, tree))
                .then(() => dispatch(On.LOAD_TANK, tree)),
            dispatch(On.LOAD_FACETS, {_id})
                .then(facets => commit(Do.ADD_FACETS, {tree, facets})),
            dispatch(On.LOAD_IMPACTS, {_id})
                .then(impacts => commit(Do.ADD_IMPACTS, {tree, impacts}))
        ]);
        return tree;
    },
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TRUNK, name));
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree));
    },

    [On.SEARCH_TREE]: async ({commit}, term) => trunkyAll(await rest.search(term)),

    [On.CLONE_TREE]: ({dispatch}, {_id}) => dispatch(On.CLONE_TRUNK, _id),

    [On.DELETE_TREE]: ({commit}, tree) =>
        rest.deleteTrunk(tree._id)
            .then(() => commit(Do.CLOSE_TREE))

}