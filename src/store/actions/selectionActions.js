import On from "../../const/on"
import Do from "../../const/do"

export default {
    [On.UNSELECT]: ({commit}, key) => {
        commit(Do.UNSELECT, key)
    },
    [On.TOGGLE_SELECT]: ({state}, {item, opts = {}}) => {
        let removed = false
        for (let i = 0; i < state.selection.length; i++) {
            if (item === state.selection[i]) {
                state.selection.splice(opts.andAfter ? i + 1 : i, opts.andAfter ? 999 : 1)
                removed = true
                break
            }
        }
        if (!removed) {
            state.selection.push(item)
            if (state.maxSelectionSize && state.maxSelectionSize < state.selection.length) {
                state.selection.splice(0, state.selection.length - state.maxSelectionSize)
            }
        }
        return !removed
    }
}