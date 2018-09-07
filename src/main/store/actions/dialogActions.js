import On from "../../const/on"
import Do from "../../const/do"
import {Dial} from "../../const/dial"

export default {
    [On.SHOW_DIALOG]: ({dispatch, state, commit}, {dialog, data}) => {
        if (state.user || state.dialogs[dialog].noAuth) {
            commit(Do.SHOW_DIALOG, {dialog, data})
        } else {
            commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE})
        }
    }
}