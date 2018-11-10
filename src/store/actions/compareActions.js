import router from "../../router/router"
import On from "../../const/on"
import {GO} from "../../const/go"
import Do from "../../const/do"
import {applyAxisCoef, applyAxisesCoef} from "../../services/calculations"

export default {
    [On.GO_COMPARE]: ({state, commit, getters}, trees) => {

        let dest = []

        if (trees) {
            dest.push(trees[0], trees[1])
        } else {
            if (state.compare.left) {
                dest.push(state.compare.left)
            }
            if (state.compare.right) {
                dest.push(state.compare.right)
            }
        }

        commit(Do.UNSELECT)

        if (dest.length === 0) {
            router.push({name: GO.COMPARE_EMPTY})
        } else if (dest.length === 1) {
            router.push({name: GO.COMPARE_PARTIAL, params: {leftId: dest[0]._id}})
        } else {
            router.push({name: GO.COMPARE, params: {leftId: dest[0]._id, rightId: dest[1]._id}})
        }
    },
    [On.CHANGE_COMPARE_QUANTITY]: ({state}, {tree, quantity}) => {
        const axisesToUpdate = state.compare.left && state.compare.left._id === tree._id ? "left" : state.compare.right && state.compare.right._id === tree._id && "right"
        if (axisesToUpdate) {
            const coef = quantity.bqt / tree.trunk.quantity.bqt
            applyAxisCoef(coef, state.compare.axis[axisesToUpdate])
            applyAxisCoef(coef, state.compare.axis.common, axisesToUpdate)
        }
    }
}