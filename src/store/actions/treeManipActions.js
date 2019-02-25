import On from "../../const/on"
import {applyAspectCoef, applyRessourceCoef, applySelectionCoef} from "../../services/calculations"
import {FACETS} from "../../const/fragments"

export default {
    [On.APPLY_QUANTITY_COEF_ALL]: ({dispatch}, {tree, coef}) => {
        dispatch(On.APPLY_QUANTITY_COEF, {tree, coef})
        applySelectionCoef(coef, tree.selection)
    },
    [On.APPLY_QUANTITY_COEF]: ({dispatch}, {tree, coef}) => {
        applyRessourceCoef(coef, [tree])
        applyRessourceCoef(coef, tree.roots)
        applyRessourceCoef(coef, tree.branches)

        applyAspectCoef(coef, tree.tank)
        applyAspectCoef(coef, tree.impacts)
        applyAspectCoef(coef, tree.damages)
        applyAspectCoef(coef, tree[FACETS])
        applyAspectCoef(coef, tree.impactsTank)
        applyAspectCoef(coef, tree.damagesTank)
    },
}