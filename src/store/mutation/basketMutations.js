import Do from "../../const/do"

export default {
    [Do.ADD_TO_BASKET]: (state, items) => {
        state.basket.push(...items)
    },
    [Do.REMOVE_FROM_BASKET]: (state, items) => {
        for (let i = 0; i < items.length; i++) {

        }
    },
}