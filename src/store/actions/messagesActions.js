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
        commit(Do.SET_MESSAGES_FILTER, {title, filter})
        commit(Do.RIGHT_MENU_VISIBLE, true)
    },
    [On.LOAD_MESSAGES]: ({commit}, filter) => api.getMessages(filter).then(ms => commit(Do.PUSH_MESSAGES, ms)),
    [On.COUNT_MESSAGES]: ({}, filter) => api.getMessageCount(filter),

    [On.UPDATE_MESSAGE]: ({state, commit}, message) => {
        message.oid = state.user._id
        message.modifDate = new Date()
        return api.putMessage(message)
            .then(() => commit(Do.UPDATE_MESSAGE, message))
    },
    [On.UPDATE_REPLY]: ({state, commit}, reply) => {
        reply.oid = state.user._id
        reply.modifDate = new Date()
        return api.putReply(reply)
            .then(() => commit(Do.UPDATE_REPLY, reply))
    },

    [On.RESPOND_MESSAGE]: ({state, commit}, message) => {
        message.oid = state.user._id
        message.creationDate = new Date()
        message.shortname = state.user.shortname || state.user.fullname
        return api.postReply(message)
            .then(() => commit(Do.RESPOND_MESSAGE, message))
    },

    [On.SEND_MESSAGE]: ({state, commit}, message) => {
        message.oid = state.user._id
        message.creationDate = new Date()
        message.shortname = state.user.shortname || state.user.fullname
        commit(Do.PUSH_MESSAGE, message)
        return api.postMessage(message)
            .catch(e => {
                commit(Do.REMOVE_MESSAGE, message)
                throw e
            })
    },
    [On.DELETE_MESSAGE]: ({state, commit}, message) => {
        return api.deleteMessage(message._id)
            .then(() => commit(Do.REMOVE_MESSAGE, message))
    },
    [On.DELETE_REPLY]: ({state, commit}, reply) => {
        return api.deleteReply(reply)
            .then(() => commit(Do.DELETE_REPLY, reply))
    }
}