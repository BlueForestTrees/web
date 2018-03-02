import On from "../../const/on";
import rest from "../../rest/routes";
import _ from 'lodash';
import Do from "../../const/do";
import {trunkyAll} from "../../services/calculations";

export default {

    [On.LOAD_ROOTS]: ({commit}, tree) => {

        let qt = tree.trunk.quantity && tree.trunk.quantity.qt;
        let unit = tree.trunk.quantity && tree.trunk.quantity.unit;
        let loadRoots = (qt && unit) ? rest.getQuantifiedRoots(qt, unit, tree._id) : rest.getUnquantifiedRoots(tree._id);

        return loadRoots
            .then(roots => ({
                ..._.omit(roots, "items"),
                items: trunkyAll(roots.items)
            }))
            .then(roots => commit(Do.SET_ROOTS, {tree, roots}));
    },


    [On.CONFIGURE_LINK]: ({}, {trunk, root, config}) => {
        rest.putLink(config.trunk, config.root);
    },

    [On.DELETE_ROOT]: async ({commit}, {tree, root}) => {
        await rest.deleteLink(tree._id, root._id);
        commit(Do.DELETE_ROOT, {tree, root});
    }
};
