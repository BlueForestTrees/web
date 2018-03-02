import On from "../../const/on";
import rest from "../../rest/routes";
import _ from 'lodash';
import Do from "../../const/do";

export default {

    [On.ADD_LINKS]: async ({commit}, {tree, roots, branches}) => {

        if (roots) {
            await Promise.all(_.map(roots, root => rest.postLink(tree._id, root._id)));
            commit(Do.ADD_ROOTS, {tree, roots});
        }

        if (branches) {
            await Promise.all(_.map(branches, branch => rest.postLink(branch._id, tree._id)));
            commit(Do.ADD_BRANCHES, {tree, branches});
        }

    }

};
