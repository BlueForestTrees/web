import Do from "../../const/do"
import Vue from "vue"
import {mergeQt} from "../../services/calculations"
import {find, findIndex} from "unit-manip"

export default {
    [Do.OPEN_TREE]: (state, tree) => state.tree = tree,
    [Do.CLOSE_TREE]: state => state.tree = null,
    [Do.SET_CURRENT_TREE_SUBPAGE]: (state, currentSubPage) => state.nav.tree.currentSubPage = currentSubPage,
    [Do.SET_TREE_CARD_FLIPPED]: (state, v) => state.nav.tree.cardFlipped = v,
    [Do.SET_TREE_IMPACT_IDX]: (state, v) => state.nav.tree.impact.idx = v,
    [Do.SET_TREE_ROOT_IDX]: (state, v) => state.nav.tree.root.idx = v,
    [Do.SET_TREE_IMPACT_TERM]: (state, v) => state.nav.tree.impact.term = v,
    [Do.SET_TREE_FACET_TERM]: (state, v) => state.nav.tree.facet.term = v,
    [Do.SET_TREE_ROOT_TERM]: (state, v) => state.nav.tree.root.term = v,
    [Do.ADD_TO_FRAGMENT]: (state, {tree, fragment, element, merge = false}) => {
        if (tree[fragment]) {
            const existing = find(tree[fragment], "_id", element._id)
            if (merge) {
                if (existing) {
                    existing.quantity = mergeQt(existing.quantity, element.quantity)
                } else {
                    tree[fragment].push(element)
                }
            } else {
                if (existing) {
                    throw new Error("existing")
                } else {
                    tree[fragment].push(element)
                }
            }
        } else {
            Vue.set(tree, fragment, [element])
        }
    },
    [Do.REMOVE_FROM_FRAGMENT]: (state, {tree, fragment, element, key = "_id"}) => {
        if (tree[fragment]) {
            const existingIndex = findIndex(tree[fragment], key, element[key])
            if (existingIndex >= 0) {
                tree[fragment].splice(existingIndex, 1)
            }
        }
    }
}