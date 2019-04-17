import Do from "../../const/do"

function removeFrom(array, element) {
    const idx = array.indexOf(element)
    if (idx !== -1) {
        array.splice(idx, 1)
    }
}

//retire tous les paneneaux de filtre qui n'ont pas de valeur
function cleanNull(search) {
    for (let i = 0; i < search.panels.length; i++) {
        const panel = search.panels[i]
        !search[panel] && (removeFrom(search.panels, panel) && i--)
    }
}

export default {
    [Do.SHOW_SEARCH_PANEL]: (state, p) => {
        cleanNull(state.search)
        removeFrom(state.search.panels, p)
        state.search.panels.unshift(p)
    },
    [Do.HIDE_SEARCH_PANEL]: (state, p) => {
        state.search[p] = null
        removeFrom(state.search.panels, p)
    },
    [Do.SET_SEARCH_TYPE]: (state, v) => state.search.type = v,
    [Do.SET_SEARCH_CATS]: (state, v) => state.search.cats = v,
    [Do.SET_SEARCH_TERM]: (state, v) => state.search.term = v,
    [Do.SET_SEARCH_OWNER]: (state, v) => state.search.owner = v,
    [Do.SET_SEARCH_IMPACT]: (state, v) => state.search.impact = v,
    [Do.SET_SEARCH_FACET]: (state, v) => state.search.facet = v
}