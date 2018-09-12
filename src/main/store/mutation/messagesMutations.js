import Do from "../../const/do"

export default {
    [Do.SET_MESSAGES]: (state, messages) => state.messages = messages,
    [Do.APPEND_MESSAGES]: (state, messages) => state.messages.list.push.apply(this.items, messages),
    [Do.SET_MESSAGES_FILTER]: (state, filter) => state.messages.filter = filter
}