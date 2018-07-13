import On from "../../const/on";
import api from "../../rest/api";
import Do from "../../const/do";
import {hasQuantity, idQtFrom} from "../../services/calculations";

export default {

    [On.LOAD_IMPACTS_TANK]: ({commit}, tree) => {
        if (hasQuantity(tree.trunk)) {
            return api.getQuantifiedImpactTank(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
                .then(impactsTank => commit(Do.ADD_IMPACTS_TANK, {tree, impactsTank}))
        }
    },

    [On.LOAD_IMPACTS]: ({commit}, tree) => {
        if (hasQuantity(tree.trunk)) {
            return api.getQuantifiedImpact(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
                .then(impacts => commit(Do.ADD_IMPACTS, {tree, impacts}))
        }
    },

    [On.DELETE_IMPACTS]:
        async ({commit}, {impacts, toDelete}) => {
            await api.deleteItems(impacts._id, _.map(toDelete, "_id"));
            commit(Do.DELETE_IMPACTS, {impacts, toDelete});
        },
    [On.ADD_IMPACT]:
        async ({commit}, {tree, impact}) => {
            await api.addImpact(idQtFrom(tree.trunk), idQtFrom(impact));
            commit(Do.ADD_IMPACT, {tree, impact});
            commit(Do.ADD_IMPACT_TANK, {tree, impact});
        }
}