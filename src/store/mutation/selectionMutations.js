import Do from "../../const/do"
import Vue from "vue"

export default {
    [Do.UNSELECT]: (state, key) => state.selections[key].splice(0, state.selection.length),
    [Do.ADD_SELECTION_KEY]: (state, key) => !state.selections[key] && Vue.set(state.selections, key, [])
}