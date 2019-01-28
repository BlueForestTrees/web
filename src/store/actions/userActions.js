import On from "../../const/on"
import Do from "../../const/do"
import api from "../../rest/api"
import forage from "../../services/forage"
import {Dial} from "../../const/dial"

export default {

    [On.USER_FROM_STORAGE]: async ({commit}) => commit(Do.SET_TOKEN, await forage.getAccessToken()),

    [On.LOGOUT]: async ({commit, dispatch}) => {
        forage.clearAccessToken()
        commit(Do.SET_TOKEN, null)
        dispatch(On.GO_HOME)
    },

    [On.WANT_SUSCRIBE]: ({}, {mail}) => api.postSuscription({mail}),

    [On.CONFIRM_SUSCRIBE]: async ({commit}, {token, fullname, password}) => api.postConfirm({token, fullname, password})
        .then(response => {
            saveToken(commit, response.token)
        }),

    [On.LOAD_USER]: ({}, oid) => oid ? api.getUser(oid) : null,

    [On.LOGIN]: async ({commit, dispatch}, {mail, password}) => api
        .postAuth({mail, password})
        .then(response => {
            saveToken(commit, response.token)
            dispatch(On.CHECK_AUTH)
        }),



    [On.CHECK_AUTH]: ({state, commit}) => {
        if (!state.user) {
            commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE, data: {message: "Vous devez être connecté pour continuer."}})
            return false
        } else if (state.expire < Date.now().valueOf() / 1000) {
            commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE, data: {message: "Votre session a expiré."}})
            return false
        } else {
            commit(Do.UPDATE_DIALOG_VISIBILITY, {dialog: Dial.CONNECT_TO_CONTINUE, visible: false})
            return true
        }
    },

    [On.CHECK_OWNERSHIP]: ({state}, tree) => {
        if (!state.user && state.user._id !== tree._id) {
            throw {code: "bf403"}
        }
    }
}

const saveToken = (commit, token) => {
    forage.setAccessToken(token)
    commit(Do.SET_TOKEN, token)
}
