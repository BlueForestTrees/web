import On from "../../const/on"
import Do from "../../const/do"

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
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
    }
}
