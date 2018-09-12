import On from "../../const/on"
import Do from "../../const/do"
import {messages} from "../state"

export default {
    [On.SHOW_MESSAGES]: ({commit}, filter) => {
        commit(Do.SET_MESSAGES, messages(filter))
        commit(Do.RIGHT_MENU_VISIBLE, true)
    }
}