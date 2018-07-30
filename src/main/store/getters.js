
export default {
    basketItem: (state) => (_id) => {
        for (let i = 0; i < state.basket.length; i++) {
            if (state.basket[i]._id === _id) {
                return state.basket[i]
            }
        }
    }
}