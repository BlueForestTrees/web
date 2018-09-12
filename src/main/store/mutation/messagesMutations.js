import Do from "../../const/do"

export default {
    [Do.SET_MESSAGES]: (state, messages) => state.messages = messages,
    [Do.PUSH_MESSAGES]: (state, messages) => state.messages.list.push.apply(state.messages.list, messages),
    [Do.PUSH_MESSAGE]: (state, message) => state.messages.list.push(message),
    [Do.REMOVE_MESSAGE]: (state, message) => {
        for (let i = 0; i < state.messages.list.length; i++) {
            if (state.messages.list[i]._id === message._id) {
                state.messages.list.splice(i, 1)
                break
            }
        }
    },
    [Do.SET_MESSAGES_FILTER]: (state, filter) => state.messages.filter = filter
}