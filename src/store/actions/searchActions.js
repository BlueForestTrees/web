import {GO} from "../../const/go"
import On from "../../const/on"
import router from "../../router/router"

export default {
    [On.GO_SEARCH]: ({}) => {
        router.push({name: GO.SEARCH})
    },
    [On.CLEAR_SEARCH]: ({state}) => {
        state.search.cats = []
        state.search.name = null
    }
}
