import {treeMap} from "../const/selections"

export default {
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
        if (state.search.owner) {
            filter.oid = state.search.owner._id
            changes = true
        }
        return changes ? filter : null
    },
    selectionIsTree: state => {
        for (let i = 0; i < state.selection.length; i++) {
            if (!state.selection[i].trunk) {
                return false
            }
        }
        return true
    },
    treeMenu: state => {
        return state.selections[treeMap] && state.selections[treeMap].length === 1 && state.nav.tree.tabIdx !== null
    }
}