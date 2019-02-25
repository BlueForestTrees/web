import Do from "../../const/do"
import Vue from "vue"

const mps = 10 // doit être le même que le ps sur GET message
export default {
    [Do.SET_MESSAGES_FILTER]: (state, {title, filter, comment}) => {
        state.messages.title = title
        if (state.messages.filter !== filter) {
            state.messages.list = []
        }
        state.messages.filter = filter
        state.messages.comment = comment
        state.messages.hasMore = true
    },
    [Do.PUSH_MESSAGES]: (state, messages) => {
        state.messages.hasMore = messages.length === mps //on dit qu'il y a encore des messages à charger si on a reçu une page pleine.
        return state.messages.list.push.apply(state.messages.list, messages)
    },
    [Do.PUSH_MY_MESSAGES]: (state, messages) => {
        return state.myMessages = messages
    },
    [Do.PUSH_MESSAGE]: (state, message) => state.messages.list.push(message),
    [Do.REMOVE_MESSAGE]: (state, message) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === message._id) {
                state.messages.list.splice(i, 1)
                break
            }
        }
    },
    [Do.UPDATE_MESSAGE]: (state, message) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === message._id) {
                state.messages.list[i].message = message.message
                break
            }
        }
    },
    [Do.UPDATE_REPLY]: (state, reply) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === reply.msgId) {
                const message = state.messages.list[i]
                for (let j = 0; j < message.replies.length; j++) {
                    if (message.replies[j]._id === reply._id) {
                        message.replies[j].message = reply.message
                        i = state.messages.list.length
                        break
                    }
                }
            }
        }
    },
    [Do.DELETE_REPLY]: (state, reply) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === reply.msgId) {
                const message = state.messages.list[i]
                for (let j = 0; j < message.replies.length; j++) {
                    if (message.replies[j]._id === reply._id) {
                        message.replies.splice(j, 1)
                        i = state.messages.list.length
                        break
                    }
                }
            }
        }
    },
    [Do.RESPOND_MESSAGE]: (state, message) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === message.msgId) {
                if (!state.messages.list[i].replies) {
                    Vue.set(state.messages.list[i], "replies", [message])
                } else {
                    state.messages.list[i].replies.push(message)
                }
                break
            }
        }
    }
}