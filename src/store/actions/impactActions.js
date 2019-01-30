import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {applyAspectCoef, createStringObjectId} from "../../services/calculations"
import {map} from 'unit-manip'
import {IMPACTS} from "../../const/fragments"

export default {

    [On.LOAD_IMPACTS_TANK]: ({commit}, {_id, bqt}) =>
        api.getImpactTank(_id)
            .then(impactsTank => applyAspectCoef(bqt, impactsTank)),

    [On.LOAD_IMPACTS]: ({}, {_id, bqt}) =>
        api.getImpact(_id)
            .then(impacts => applyAspectCoef(bqt, impacts)),

    [On.LOAD_DAMAGES_TANK]: ({commit}, {_id, bqt}) =>
        api.getDamageTank(_id)
            .then(damagesTank => applyAspectCoef(bqt, damagesTank)),

    [On.LOAD_DAMAGES]: ({}, {_id, bqt}) =>
        api.getDamage(_id)
            .then(damages => applyAspectCoef(bqt, damages)),

    [On.DELETE_IMPACTS]:
        async ({commit}, {impacts, toDelete}) => {
            await api.deleteImpacts(impacts._id, map(toDelete, e => e._id))
            commit(Do.DELETE_IMPACTS, {impacts, toDelete})
        },

    [On.IMPORT_IMPACT_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("csv.ademe.impact", file)
        return api.postImpactAdeme(formData)
    },

    [On.ADD_IMPACT]: ({}, {tree, impactEntry, quantity}) => {
        const impact = ({
            _id: createStringObjectId(), type: "impact", color: impactEntry.color,
            impactId: impactEntry._id, name: impactEntry.name, quantity
        })
        if (tree[IMPACTS]) {
            tree[IMPACTS].push(impact)
        }
        return api.postImpact(impact._id, tree._id, impact.impactId, impact.quantity.bqt)
    }
}