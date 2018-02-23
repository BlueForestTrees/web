import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";

export default {

    [On.LOAD_IMPACTS]: ({}, {_id}) => {
        return rest.getImpacts(_id);
    },

    [On.DELETE_IMPACTS]: async ({commit}, {impacts, toDelete}) => {
        rest.deleteImpacts(impacts._id, _.map(toDelete, "_id"));
        commit(Do.DELETE_IMPACTS, {impacts, toDelete});
    },
    [On.ADD_IMPACT]: async ({commit}, {tree, impact}) => {
        rest.addImpact(tree._id, impact);
        commit(Do.ADD_IMPACT, {tree, impact});
    }
}