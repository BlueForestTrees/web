export default {
    basketArray: (state) => Object.values(state.basket),
    filter: state => {
        const cat = {}
        for (let i = 0; i < state.search.cats.length; i++) {
            cat["c" + (i + 1)] = state.search.cats[i]._id
        }
        const f = {cat}
        if (state.search.name) {
            f.term = state.search.name
        }
        return f
    }
}