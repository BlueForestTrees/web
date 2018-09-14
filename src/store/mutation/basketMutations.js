import Do from "../../const/do"
import Vue from 'vue'

export default {
    [Do.ADD_TO_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {
            Vue.set(state.basket, items[i]._id, items[i])
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, items) => {
        for(let i = 0; i < items.length; i++){
            Vue.delete(state.basket, items[i]._id)
        }
    },
}