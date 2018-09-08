import On from "../../const/on"
import Do from "../../const/do"

export default {
    [On.MOUNT_APP]: async ({dispatch, commit}) => {
        dispatch(On.USER_FROM_STORAGE)
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e)
        throw e
    },
    [On.SWITCH_LEFT_MENU]: async ({commit}) => {
        commit(Do.SWITCH_LEFT_MENU)
    }
}
