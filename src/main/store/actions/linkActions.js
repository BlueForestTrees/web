import On from "../../const/on";
import api from "../../rest/api";
import {map} from 'lodash';
import Do from "../../const/do";

export default {
    [On.LINK]: async ({commit}, {trunk, root}) => {
        await api.putLink(trunk, root);
        commit(Do.ADD_ROOTS, {tree: trunk, roots: [root]});
        commit(Do.ADD_BRANCHES, {tree: root, branches: [trunk]});
    },

    [On.DELETE_LINK]: async ({commit}, {left, right}) => {
        await api.deleteLink(left._id, right._id);
        commit(Do.DELETE_ROOT, {tree: left, root: right});
        commit(Do.DELETE_BRANCH, {tree: right, branch: left});
    }

};
