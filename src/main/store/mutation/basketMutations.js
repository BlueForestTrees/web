import Do from "../../const/do"
import {findIndex} from 'unit-manip'

export default {
    [Do.ADD_TO_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const existingIndex = findIndex(state.basket, "_id", item._id)
            if (existingIndex >= 0) {
                state.basket.splice(existingIndex, 1, item)
            } else {
                state.basket.push(item)
            }
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, items) => {
        for(let i = 0; i < items.length; i++){
            const item = items[i]
            state.basket.splice(state.basket.indexOf(item), 1)
        }
    },
}