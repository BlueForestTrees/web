import On from "../../const/on";
import api from "../../rest/api";
import {omit} from 'lodash';
import Do from "../../const/do";
import {hasQuantity, trunkyAll} from "../../services/calculations";
import router from "../../router/router";
import {GO} from "../../const/go";

export default {

    [On.GO_ROOT]: ({commit, state}, {treeId, rootId}) => {
        router.push({name: GO.ROOT, params: {treeId, rootId}});
    },
    [On.LOAD_ROOTS]: ({commit}, tree) => {
        const loadRoots = hasQuantity(tree.trunk) ?
            api.getQuantifiedRoots(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
            :
            api.getUnquantifiedRoots(tree._id);

        return loadRoots
            .then(roots => ({
                ...omit(roots, "items"),
                items: trunkyAll(roots.items)
            }))
            .then(roots => commit(Do.SET_ROOTS, {tree, roots}));
    },

};
