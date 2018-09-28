export default {
    basketArray: (state) => Object.values(state.basket),
    filter: state => {
        const cat = {}
        const filter = {cat}
        let changes = false
        for (let i = 0; i < state.search.cats.length; i++) {
            cat["c" + i] = state.search.cats[i]._id
            changes = true
        }
        if (state.search.name) {
            filter.term = state.search.name
            changes = true
        }
        return changes ? filter : null
    }
}