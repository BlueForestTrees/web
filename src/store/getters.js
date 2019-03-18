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
    showTreeRuban: state => {
        return state.selections[treeMap] && state.selections[treeMap].length === 1
    },
    isAdmin: state => {
        return state.user && state.user.rights && state.user.rights.charAt(0) === 'G'
    }
}