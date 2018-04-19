import On from "../../const/on";
import api from "../../rest/api";
import _ from 'lodash';
import Do from "../../const/do";

export default {

    [On.ADD_LINKS]: async ({commit}, {tree, roots, branches}) => {

        if (roots) {
            await Promise.all(_.map(roots, root => api.postLink(tree._id, root._id)));
            commit(Do.ADD_ROOTS, {tree, roots});
        }

        if (branches) {
            await Promise.all(_.map(branches, branch => api.postLink(branch._id, tree._id)));
            commit(Do.ADD_BRANCHES, {tree, branches});
        }

    },

    [On.CONFIGURE_LINK]: ({}, {left, right, config}) => api.putLink(config.left, config.right),

    [On.DELETE_LINK]: async ({commit}, {left, right}) => {
        await api.deleteLink(left._id, right._id);
        commit(Do.DELETE_ROOT, {tree: left, root: right});
        commit(Do.DELETE_BRANCH, {tree: right, branch: left});
    }

};
