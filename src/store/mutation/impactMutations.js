import Vue from 'vue'
import Do from "../../const/do"

export default {
    [Do.ADD_IMPACT_TANK]: ({}, {tree, impact}) => {
        tree.impactsTank.items.push(impact)
    },
    [Do.ADD_IMPACTS_TANK]: ({}, {tree, impactsTank}) => {
        if (!tree.impactsTank) {
            Vue.set(tree, "impactsTank", impactsTank)
        } else {
            tree.impactsTank.items.push(impactsTank)
        }
    },

    [Do.DELETE_IMPACT]: ({}, {tree, impact}) => {
        if (impacts.items) {
            _.forEach(toDelete, impact => impacts.items.splice(impacts.items.indexOf(impact), 1))
        }
    }
}