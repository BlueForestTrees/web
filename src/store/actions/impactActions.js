import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {applyAspectCoef, createStringObjectId, getFragment, getFragment2, treeBqt} from "../../services/calculations"
import {IMPACT_TANK, IMPACTS} from "../../const/fragments"

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

    [On.DELETE_IMPACT_TANK]: async ({dispatch, commit}, {tree, impactTank}) => {
        await dispatch(On.UPDATE_TREE, {tree, fragments: [IMPACTS]})
        const impact = getFragment(tree, {_id: impactTank._id, type: IMPACTS})
        if (impact) {
            const deleteResult = dispatch(On.DELETE_IMPACT, {tree, impact})
            if (impact.quantity.bqt === impactTank.quantity.bqt) {
                return deleteResult
                    .then(() => commit(Do.REMOVE_FROM_FRAGMENT, {tree, element: impactTank, fragment: IMPACT_TANK}))
                    .then(() => dispatch(On.SNACKBAR, {text: "Impact retiré"}))
            } else {
                return deleteResult
                    .then(() => {
                    })
                    .then(() => commit(Do.REMOVE_PARTIAL_FROM_FRAGMENT, {tree, element: impact, fragment: IMPACT_TANK}))
                    .then(() => dispatch(On.SNACKBAR, {text: "Impact partiellement retiré. Le reste provient de la fabrication. Pour réduire encore cet impact, il faut changer la fabrication.", color: "orange"}))
            }
        } else {
            return dispatch(On.SNACKBAR, {text: "Cet impact provient de la fabrication.", color: "orange"})
        }
    },

    [On.DELETE_IMPACT]:
        ({commit}, {tree, impact}) =>
            api.deleteImpact(tree._id, impact._id, impact.impactId)
                .then(() => commit(Do.REMOVE_FROM_FRAGMENT, {tree, element: impact, fragment: IMPACTS})),

    [On.IMPORT_IMPACT_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("csv.ademe.impact", file)
        return api.postImpactAdeme(formData)
    },

    [On.ADD_IMPACT]: ({commit}, {tree, entry, quantity}) => {
        const impact = ({
            _id: createStringObjectId(), type: "impact", color: entry.color,
            impactId: entry._id, name: entry.name,
            quantity: {
                bqt: quantity.bqt / treeBqt(tree),
                g: quantity.g,
            }
        })
        const impactTank = {...impact, _id: impact.impactId}
        delete impactTank.impactId

        return api.postImpact(impact._id, tree._id, impact.impactId, impact.quantity.bqt)
            .then(() => {
                commit(Do.ADD_TO_FRAGMENT, {tree, fragment: IMPACTS, element: impact})
                commit(Do.ADD_TO_FRAGMENT, {tree, fragment: IMPACT_TANK, element: impactTank, merge: true})
            })
    }
}