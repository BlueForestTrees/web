import Vue from 'vue'
import Do from "../../const/do"
import {find} from 'lodash'
import {add} from "../../services/calculations"

export default {
    [Do.ADD_IMPACT]: ({}, {tree, impact}) => {
        const existing = find(tree.impacts.items, {_id: impact._id})
        if (existing) {
            existing.quantity = add(impact.quantity, existing.quantity)
        } else {
            tree.impacts.items.push(impact)
        }
    },
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
    [Do.ADD_IMPACTS]: ({}, {tree, impacts}) => {
        if (!tree.impacts) {
            Vue.set(tree, "impacts", impacts)
        } else {
            tree.impacts.items.push(impacts)
        }
    },

    [Do.DELETE_IMPACTS]: ({}, {impacts, toDelete}) => {
        if (impacts.items) {
            _.forEach(toDelete, impact => impacts.items.splice(impacts.items.indexOf(impact), 1))
        }
    }
}