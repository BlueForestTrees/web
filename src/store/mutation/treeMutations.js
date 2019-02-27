import Do from "../../const/do"


export default {
    [Do.OPEN_TREE]: (state, tree) => state.tree = tree,
    [Do.CLOSE_TREE]: state => state.tree = null,
    [Do.SET_CURRENT_TREE_SUBPAGE]: (state, currentSubPage) => state.nav.tree.currentSubPage = currentSubPage,
    [Do.SET_TREE_CARD_FLIPPED]: (state, v) => state.nav.tree.cardFlipped = v,
    [Do.SET_TREE_IMPACT_IDX]: (state, v) => state.nav.tree.impact.idx = v,
    [Do.SET_TREE_ROOT_IDX]: (state, v) => state.nav.tree.root.idx = v,
    [Do.SET_TREE_IMPACT_TERM]: (state, v) => state.nav.tree.impact.term = v,
    [Do.SET_TREE_FACET_TERM]: (state, v) => state.nav.tree.facet.term = v,
    [Do.SET_TREE_ROOT_TERM]: (state, v) => state.nav.tree.root.term = v,
}