import router from "../../router/router"
import {GO} from "../../const/go"
import On from "../../const/on"
import Do from "../../const/do"

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET})
    },
    [On.ADD_TO_BASKET]: ({commit, dispatch}, items) => {
        commit(Do.ADD_TO_BASKET, items)
    },
    [On.REMOVE_FROM_BASKET]: ({commit, dispatch}, items) => {
        commit(Do.REMOVE_FROM_BASKET, items)
    }
}