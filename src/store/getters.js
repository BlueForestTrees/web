import {FACETS, IMPACT_TANK} from "../const/fragments"

export default {
    basketArray: (state) => Object.values(state.basket),
    basketImpactArray: (state) => Object.values(state['basket' + IMPACT_TANK]),
    basketFacetArray: (state) => Object.values(state['basket' + FACETS]),
    emptyBasket: (state, getters) => !getters.notEmptyBasket,
    notEmptyBasket: (s, getters) => getters.basketArray.length > 0 || getters.basketImpactArray.length > 0 || getters.basketFacetArray.length > 0,
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
}