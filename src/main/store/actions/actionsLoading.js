import On from "../../const/on";
import rest from "../../services/rest";
import _ from 'lodash';
import Do from "../../const/do";
import units from "../../services/units";
import {trunkyAll} from "../../services/mapper";

export default {

    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },

    [On.LOAD_TRUNK]: ({}, {_id}) => {
        return rest.getTrunk(_id);
    },
    [On.LOAD_FACETS]: ({}, {_id}) => {
        return rest.getFacets(_id);
    },

    [On.LOAD_OPEN_TREE]: async ({commit, state, dispatch}, {_id}) => {
        commit(Do.CLOSE_TREE);
        commit(Do.INIT_TREE, {tree: state.tree, _id});
        dispatch(On.LOAD_TRUNK, {_id}).then(trunk => commit(Do.SET_TRUNK, {tree: state.tree, trunk}));
        dispatch(On.LOAD_FACETS, {_id}).then(facets => commit(Do.ADD_FACETS, {tree: state.tree, facets}));
        dispatch(On.POPULATE_ROOTS, state.tree);
    },
    [On.POPULATE_ROOTS]: async ({dispatch, commit}, tree) => {
        dispatch(On.LOAD_ROOTS, tree).then(roots => commit(Do.SET_ROOTS, {tree, roots}));
    },
    [On.LOAD_ROOTS]: ({}, {_id}) => {
        return rest.getRoots(_id)
            .then(roots => ({
                ..._.omit(roots, "items"),
                items: trunkyAll(roots.items)
            }));
    },

    [On.ADD_ROOTS]: async ({commit}, {tree, roots}) => {
        await Promise.all(_.map(roots, root => rest.linkRoot(tree._id, root._id)));
        commit(Do.ADD_ROOTS, {tree, roots});
    }
};
