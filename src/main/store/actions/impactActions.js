import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";
import {hasQuantity} from "../../services/mapper";

export default {

    [On.LOAD_IMPACTS]: ({commit}, tree) => (
        hasQuantity(tree.trunk) ?
            rest.getQuantifiedImpacts(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
            : rest.getImpacts(tree._id)
    ).then(impacts => commit(Do.ADD_IMPACTS, {tree, impacts})),

    [On.DELETE_IMPACTS]:
        ({commit}, {impacts, toDelete}) => {
            rest.deleteImpacts(impacts._id, _.map(toDelete, "_id"));
            commit(Do.DELETE_IMPACTS, {impacts, toDelete});
        },
    [On.ADD_IMPACT]:
        async ({commit}, {tree, impact}) => {
            rest.addImpact(tree._id, impact);
            commit(Do.ADD_IMPACT, {tree, impact});
        }
}