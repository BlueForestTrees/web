import On from "../../const/on"
import {applyAspectCoef, applyRessourceCoef} from "../../services/calculations"

export default {
    [On.APPLY_QUANTITY_COEF]: ({dispatch}, {tree, coef}) => {
        applyRessourceCoef(coef, [tree])
        applyRessourceCoef(coef, tree.roots)
        applyRessourceCoef(coef, tree.branches)

        applyAspectCoef(coef, tree.tank)
        applyAspectCoef(coef, tree.impacts)
        applyAspectCoef(coef, tree.damages)
        applyAspectCoef(coef, tree.facets)
        applyAspectCoef(coef, tree.impactsTank)
        applyAspectCoef(coef, tree.damagesTank)
    },
}