import On from "../../const/on"
import Do from "../../const/do"
import {X_CORRELATION_ID} from "../../const/headers"
import api from "../../rest/api"
import router from "../../router/router"

export default {
    [On.GO_TO]: ({}, route) => {
        router.push({name: route})
    },
    [On.MOUNT_APP]: async ({dispatch}) => {
        //await dispatch(On.INIT_CORRELATION_ID)
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
    [On.INIT_CORRELATION_ID]: async ({state}) => {
        let correlationId = localStorage.getItem(X_CORRELATION_ID)
        if (!correlationId) {
            correlationId = await api.getCorrelationId()
            localStorage.setItem(X_CORRELATION_ID, correlationId)
        }
        state.correlationId = correlationId
    }

}
