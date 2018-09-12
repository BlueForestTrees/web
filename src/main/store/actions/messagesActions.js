import On from "../../const/on"
import Do from "../../const/do"
import {messages} from "../state"
import api from "../../rest/api"

export default {
    [On.SHOW_MESSAGES]: ({commit}, filter) => {
        commit(Do.SET_MESSAGES, messages(filter))
        commit(Do.RIGHT_MENU_VISIBLE, true)
    },
    [On.LOAD_MESSAGES]: ({commit}, filter) => api.getMessages(filter).then(ms => commit(Do.PUSH_MESSAGES, ms)),
    [On.SEND_MESSAGE]: ({state, commit}, message) => {
        message.oid = state.user._id
        message.sending = true
        commit(Do.PUSH_MESSAGE, message)
        return api.postMessage(message)
            .then(() => message.sending = false)
            .catch(e => {
                commit(Do.REMOVE_MESSAGE, message)
                throw e
            })
    }
}