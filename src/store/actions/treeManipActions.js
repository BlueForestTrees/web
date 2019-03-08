import On from "../../const/on"
import {applyAspectCoef, applyRessourceCoef, applySelectionCoef} from "../../services/calculations"
import {FACETS} from "../../const/fragments"

export default {
    [On.APPLY_QUANTITY_COEF_ALL]: ({dispatch}, {tree, coef}) => {
        dispatch(On.APPLY_COEF_TO_TREE, {tree, coef})
        applySelectionCoef(coef, tree.selection)
    },
    [On.APPLY_COEF_TO_TREE]: ({dispatch}, {tree, coef}) => {
        applyRessourceCoef(coef, [tree])

        applyAspectCoef(coef, tree.tank)
        applyAspectCoef(coef, tree.impacts)
        applyAspectCoef(coef, tree.damages)
        applyAspectCoef(coef, tree[FACETS])
        applyAspectCoef(coef, tree.impactsTank)
        applyAspectCoef(coef, tree.damagesTank)

        tree.roots && tree.roots.forEach(tree => dispatch(On.APPLY_COEF_TO_TREE, {tree, coef}))
        tree.branches && tree.branches.forEach(tree => dispatch(On.APPLY_COEF_TO_TREE, {tree, coef}))
    },
}