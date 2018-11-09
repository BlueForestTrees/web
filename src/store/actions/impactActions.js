import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {hasQuantity, idQtFrom, multiplyAspectBqt} from "../../services/calculations"
import {map} from 'unit-manip'

export default {
    
    [On.LOAD_IMPACTS_TANK]: ({commit}, {_id, bqt}) =>
        api.getImpactTank(_id)
            .then(impactsTank => multiplyAspectBqt(bqt, impactsTank)),
    
    [On.LOAD_IMPACTS]: ({}, {_id, bqt}) =>
        api.getImpact(_id)
            .then(impacts => multiplyAspectBqt(bqt, impacts)),

    [On.LOAD_DAMAGES_TANK]: ({commit}, {_id, bqt}) =>
        api.getDamageTank(_id)
            .then(damagesTank => multiplyAspectBqt(bqt, damagesTank)),

    [On.LOAD_DAMAGES]: ({}, {_id, bqt}) =>
        api.getDamage(_id)
            .then(damages => multiplyAspectBqt(bqt, damages)),
    
    [On.DELETE_IMPACTS]:
        async ({commit}, {impacts, toDelete}) => {
            await api.deleteImpacts(impacts._id, map(toDelete, e => e._id))
            commit(Do.DELETE_IMPACTS, {impacts, toDelete})
        },

    [On.IMPORT_IMPACT_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("csv.ademe.impact", file)
        return api.postImpactAdeme(formData)
    }
}