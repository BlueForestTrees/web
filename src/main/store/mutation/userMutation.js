import Do from "../../const/do"
import decode from 'jwt-decode'

export default {
    [Do.SET_TOKEN]: (state, token) => {
        state.token = token
        if (token) {
            state.user = decode(token).user
        } else {
            state.user = null
        }
    },
}