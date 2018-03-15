import On from "../../const/on";
import rest from "../../rest/routes";
import Do from "../../const/do";
import {hasQuantity, idQtFrom} from "../../services/calculations";

export default {

    [On.LOAD_IMPACTS]: ({commit}, tree) => {
        if (hasQuantity(tree.trunk)) {
            return rest.getQuantifiedImpactTank(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
                .then(impacts => commit(Do.ADD_IMPACTS, {tree, impacts}))
        }
    },

    [On.DELETE_IMPACTS]:
        ({commit}, {impacts, toDelete}) => {
            rest.deleteImpacts(impacts._id, _.map(toDelete, "_id"));
            commit(Do.DELETE_IMPACTS, {impacts, toDelete});
        },
    [On.ADD_IMPACT]:
        async ({commit}, {tree, impact}) => {
            rest.addImpact(idQtFrom(tree.trunk), idQtFrom(impact));
            commit(Do.ADD_IMPACT, {tree, impact});
        }
}