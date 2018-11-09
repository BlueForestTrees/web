import Do from "../../const/do"
import Vue from 'vue'

export default {
    [Do.ADD_TO_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {
            const type = items[i].type
            if (!type) {
                Vue.set(state.basket, items[i]._id, items[i])
            } else {
                Vue.set(state[`basket${type}`], items[i]._id, items[i])
            }
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {
            const type = items[i].type
            if (!type) {
                Vue.delete(state.basket, items[i]._id)
            } else {
                Vue.delete(state[`basket${type}`], items[i]._id)
            }
        }
    },
}