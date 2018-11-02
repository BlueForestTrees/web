import router from "../../router/router"
import {GO} from "../../const/go"
import On from "../../const/on"
import Do from "../../const/do"
import {find} from "unit-manip"
import forage from "../../services/forage"

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET})
    },
    [On.ADD_SELECTION_TO_BASKET]: ({dispatch, state}) => {
        dispatch(On.ADD_TO_BASKET, state.selection)
        dispatch(On.UNSELECT)
    },
    [On.ADD_TO_BASKET]: ({commit, dispatch, state}, items) => {
        commit(Do.ADD_TO_BASKET, items)
        commit(Do.CLOSE_COMPARE_RIGHT)
        dispatch(On.SAVE_BASKET)
    },
    [On.REMOVE_SELECTION_FROM_BASKET]: ({dispatch, state}) => {
        dispatch(On.REMOVE_FROM_BASKET, state.selection)
        dispatch(On.UNSELECT)
    },
    [On.REMOVE_FROM_BASKET]: ({state, commit, dispatch}, items) => {
        commit(Do.REMOVE_FROM_BASKET, items)
        if (state.tree) {
            if (find(items, "_id", state.tree._id)) {
                commit(Do.CLOSE_TREE)
            }
        }
        if (state.compare.left) {
            if (find(items, "_id", state.compare.left._id)) {
                commit(Do.CLOSE_COMPARE_LEFT)
            }
        }
        if (state.compare.right) {
            if (find(items, "_id", state.compare.right._id)) {
                commit(Do.CLOSE_COMPARE_RIGHT)
            }
        }
        dispatch(On.SAVE_BASKET)
    },
    [On.SAVE_BASKET]: ({state}) => {
        // forage.setBasket(Object.values(state.basket))
    },
    [On.LOAD_BASKET]: ({commit}) => {
        // const items = forage.getBasket()
        // if (items) {
        //     commit(Do.ADD_TO_BASKET, items)
        // }
    }
}