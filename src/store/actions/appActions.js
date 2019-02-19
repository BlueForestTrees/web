import On from "../../const/on"
import Do from "../../const/do"
import {X_REQUEST_ID} from "../../const/headers"
import router from "../../router/router"
import {generateXRequestId} from "../../services/calculations"

export default {
    [On.GO_TO]({}, route) {
        router.push({name: route})
    },
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.INIT_X_REQUEST_ID)
        dispatch(On.DARK_FROM_STORAGE)
        dispatch(On.USER_FROM_STORAGE)
        dispatch(On.LOAD_GRANDEUR)
        dispatch(On.LOAD_BASKET)
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e)
        throw e
    },
    [On.SWITCH_LEFT_MENU]: async ({commit}) => {
        commit(Do.SWITCH_LEFT_MENU)
    },
    [On.DARK_FROM_STORAGE]: ({state}) => {
        state.nav.dark = localStorage.getItem("dark") === 'true'
    },
    [On.INIT_X_REQUEST_ID]: async ({state}) => {
        let xRequestId = localStorage.getItem(X_REQUEST_ID)
        if (!xRequestId) {
            xRequestId = generateXRequestId()
            localStorage.setItem(X_REQUEST_ID, xRequestId)
            console.log("x-request-id inited to", xRequestId)
        } else {
            console.log("x-request-id is", xRequestId)
        }
        state.xRequestId = xRequestId
    },
    [On.ADD_CALLBACK]: ({dispatch, state}, callback) => {
        state.nav.callback.push(callback)
    },
    [On.POP_CALLBACK]: ({dispatch, state}, params) => {
        const callback = state.nav.callback.pop()
        if (callback) {
            dispatch(callback, params)
        }
    },

}
