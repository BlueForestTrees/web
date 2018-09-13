import On from "../../const/on"
import Do from "../../const/do"
import {messages} from "../state"
import api from "../../rest/api"
import {secs} from "../../const/sections"

export default {
    [On.SHOW_GLOBAL_MESSAGES]: ({dispatch}) => {
        dispatch(On.SHOW_MESSAGES, {title: "Accueil Général", filter: {type: secs.GLOBAL_APP}})
    },
    [On.SHOW_MESSAGES]: ({commit}, {title, filter}) => {
        commit(Do.SET_MESSAGES, messages(title, filter))
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