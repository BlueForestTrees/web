import Do from "../../const/do";

export default {
    [Do.SET_USER]: (state, user) => {
        state.user = user;
    }
}