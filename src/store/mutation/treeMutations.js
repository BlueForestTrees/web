import Do from "../../const/do"


export default {
    [Do.OPEN_TREE]: (state, tree) => state.tree = tree,
    [Do.CLOSE_TREE]: state => state.tree = null,
    [Do.SET_CURRENT_TREE_SUBPAGE]: (state, currentSubPage) => state.nav.tree.currentSubPage = currentSubPage,
    [Do.SET_TREE_MODEADD]: (state, v) => state.nav.tree.modeAdd = v
}