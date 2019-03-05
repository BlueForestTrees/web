import Do from "../../const/do"
import {findIndex} from "unit-manip"

export default {
    [Do.ADD_TO_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const idx = findIndex(state.basket, "_id", item._id)

            if (idx !== -1) {
                state.basket.splice(idx, 1)
            }
            state.basket.unshift(item)
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, items) => {

    },
}