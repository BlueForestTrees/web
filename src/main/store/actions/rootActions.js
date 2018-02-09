import On from "../../const/on";
import rest from "../../services/rest";
import _ from 'lodash';
import Do from "../../const/do";
import {trunkyAll} from "../../services/mapper";

export default {

    [On.POPULATE_ROOTS]: ({dispatch, commit}, tree) => {
        return dispatch(On.LOAD_ROOTS, tree.trunk)
            .then(roots => commit(Do.SET_ROOTS, {tree, roots}));
        },
    [On.LOAD_ROOTS]: ({}, {quantity, _id}) => {
        let qt = quantity && quantity.qt;
        let unit = quantity && quantity.unit;
        let roots = qt ? rest.getQuantifiedRoots(qt, unit, _id) : rest.getUnquantifiedRoots(_id);

        return roots.then(roots => ({
            ..._.omit(roots, "items"),
            items: trunkyAll(roots.items)
        }));
    },

    [On.ADD_ROOTS]: async ({commit}, {tree, roots}) => {
        await Promise.all(_.map(roots, root => rest.postRoot(tree._id, root._id)));
        commit(Do.ADD_ROOTS, {tree, roots});
    },

    [On.CONFIGURE_ROOT]: ({}, {trunk, root, config}) => {
        rest.putRoot(config.trunk, config.root);
    },

    [On.DELETE_ROOT]: async ({commit}, {tree, root}) => {
        await rest.deleteRoot(tree._id, root._id);
        commit(Do.DELETE_ROOT, {tree, root});
    }
};
