import On from "../../const/on"
import Do from "../../const/do"
import api from "../../rest/api"
import forage from "../../services/forage"

export default {

    [On.USER_FROM_STORAGE]: async ({commit}) => {
        commit(Do.SET_TOKEN, await forage.getAccessToken())
    },

    [On.WANT_SUSCRIBE]: ({}, {mail}) => api.postMail({mail}),

    [On.CONFIRM_SUSCRIBE]: async ({commit}, {token, fullname, password}) => api.postConfirm({token, fullname, password})
        .then(response => {
            saveToken(commit, response.token)
        }),

    [On.LOGIN]: async ({commit}, {mail, password}) => api.postAuth({mail, password})
        .then(response => {
            saveToken(commit, response.token)
        }),

    [On.LOGOUT]: async ({commit}) => {
        forage.clearAccessToken()
        commit(Do.SET_TOKEN, null)
    }
}

const saveToken = (commit, token) => {
    forage.setAccessToken(token)
    commit(Do.SET_TOKEN, token)
}
