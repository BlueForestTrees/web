import On from "../../const/on";
import api from "../../rest/api";
import {map} from 'lodash';

export default {
    [On.LINK]: async ({commit}, {trunk, root}) => {
        await api.putLink(trunk, root);
    },

    [On.DELETE_LINK]: async ({commit}, {left, right}) => {
        await api.deleteLink(left._id, right._id);

        if (left.roots) {
            for (let i = 0; i < left.roots.items.length; i++) {
                const item = left.roots.items[i];
                if (item._id === right._id) {
                    left.roots.items.splice(i, 1);
                }
            }
        }
        if (right.branches) {
            for (let i = 0; i < right.branches.items.length; i++) {
                const item = right.branches.items[i];
                if (item._id === left._id) {
                    right.branches.items.splice(i, 1);
                }
            }
        }

    }

};
