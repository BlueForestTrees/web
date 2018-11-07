export default {
    basketArray: (state) => Object.values(state.basket),
    notEmptyBasket: (s, getters) => getters.basketArray.length > 0,
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
    },
    selectionCount: state => state.selection.length,
    isSelected: item => state => {
        for (let i = 0; i < state.selection.length; i++) {
            if (item === state.selection[i]) {
                return true
            }
        }
    },
    anySelected: (state, getters) => getters.selectionCount > 0 && state.selection,
    oneSelected: (state, getters) => getters.selectionCount === 1 && state.selection[0],
    twoSelected: (state, getters) => getters.selectionCount === 2 && state.selection,
    manySelected: (state, getters) => getters.selectionCount > 2 && state.selection,
    lastSelected: (state, getters) => getters.selectionCount > 0 && state.selection[getters.selectionCount - 1]
}