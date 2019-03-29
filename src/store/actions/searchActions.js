import {GO} from "../../const/go"
import On from "../../const/on"
import router from "../../router/router"
import api from "../../rest/api"

export default {
    [On.GO_SEARCH]: ({}) => {
        router.push({name: GO.SEARCH})
    },
    [On.CLEAR_SEARCH]: ({state}) => {
        state.search.cats = []
        state.search.name = null
    },
    [On.SEARCH_ALL]: ({state}, query) => api.searchAll(query)
}
