import On from "../../const/on"

export default {
    [On.MOUNT_APP]: async ({dispatch, commit}) => {
        dispatch(On.USER_FROM_STORAGE)
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e)
        throw e
    }
}
