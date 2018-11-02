import Do from "../../const/do"

export default {
    [Do.UNSELECT]: (state) => state.selection.splice(0, state.selection.length),
}