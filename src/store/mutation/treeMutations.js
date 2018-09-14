import Do from "../../const/do"


export default {
    [Do.OPEN_TREE]: (state, tree) => state.tree = tree,
    [Do.CLOSE_TREE]: state => state.tree = null
}