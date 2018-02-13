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
            dispatch(On.LOAD_TRUNK, {_id})
                .then(trunk => commit(Do.SET_TRUNK, {tree, trunk}))
                .then(() => dispatch(On.POPULATE_ROOTS, tree))
                .then(() => dispatch(On.LOAD_TANK, tree)),
            dispatch(On.LOAD_FACETS, {_id})
                .then(facets => commit(Do.ADD_FACETS, {tree, facets}))
        ]);
        return tree;
    },
    [On.CREATE_AND_OPEN_TREE]: async ({dispatch}, {name}) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CREATE_TREE, name));
    },
    [On.CLONE_OPEN_TREE]: async ({dispatch}, tree) => {
        dispatch(On.LOAD_OPEN_TREE, await dispatch(On.CLONE_TREE, tree));
    },

    [On.SEARCH_TREE]: async ({commit}, term) => trunkyAll(await rest.search(term)),

    [On.CLONE_TREE]: async ({}, {_id}) => {
        return rest.cloneTrunk(_id);
    },

    [On.CREATE_TREE]: async ({commit, state, dispatch}, name) => {
        return trunky(await rest.createTrunk({name}));
    },
    [On.DELETE_TREE]: async ({commit}, tree) => {
        await rest.deleteTrunk(tree._id);
        commit(Do.CLOSE_TREE);
    }

}