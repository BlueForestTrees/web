import router from "../../router/router"
import {GO} from "../../const/go"
import On from "../../const/on"
import Do from "../../const/do"
// import {find} from "unit-manip"
// import forage from "../../services/forage"

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET})
    },
    [On.ADD_TO_BASKET]: async ({commit, dispatch, state}, items) => {
        commit(Do.ADD_TO_BASKET, Array.isArray(items) ? items : [items])
        // return dispatch(On.SAVE_BASKET)
    },
    [On.REMOVE_FROM_BASKET]: ({state, commit, dispatch}, items) => {
        commit(Do.REMOVE_FROM_BASKET, Array.isArray(items) ? items : [items])
        // dispatch(On.SAVE_BASKET)
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