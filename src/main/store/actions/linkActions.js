import On from "../../const/on";
import api from "../../rest/api";
import {map} from 'lodash';

export default {
    [On.LINK]: async ({commit}, {trunk, root}) => {
        await api.putLink(trunk, root);
    },

    [On.DELETE_LINK]: async ({commit}, {left, right}) => {
        await api.deleteLink(left._id, right._id);
    }

};
