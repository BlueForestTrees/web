import {treeMap} from "../const/selections"

export default {
    filter: state => {
        const filter = {}
        let changes = false
        if (state.search.type) {
            filter.type = state.search.type
            changes = true
        }
        if (state.search.cats && state.search.cats.length) {
            filter.cat = state.search.cats[state.search.cats.length - 1]._id
            changes = true
        }
        if (state.search.term) {
            filter.term = state.search.term
            changes = true
        }
        if (state.search.owner) {
            filter.oid = state.search.owner._id
            changes = true
        }
        if (state.search.impact) {
            filter.iid = state.search.impact._id
            filter.ibqt = state.search.impact.bqt
            changes = true
        }
        if (state.search.facet) {
            filter.fid = state.search.facet._id
            filter.fbqt = state.search.facet.bqt
            changes = true
        }
        return changes ? filter : null
    },
    isAdmin: state => {
        return state.user && state.user.rights && state.user.rights.charAt(0) === 'G'
    },
    isOwner: state => tree => tree && state.user && state.user._id === tree.oid,
}