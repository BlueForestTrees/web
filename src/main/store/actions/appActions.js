import On from "../../const/on"
import Do from "../../const/do"

export default {
    [On.MOUNT_APP]: async ({dispatch, commit}) => {
        // await dispatch(On.LOAD_OPEN_TREE, {_id: "111111111111111111111111"})
        // await dispatch(On.LOAD_OPEN_TREE, {_id: "222222222222222222222222"})
        dispatch(On.USER_FROM_STORAGE)
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e)
        throw e
    }
}
