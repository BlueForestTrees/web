import On from "../../const/on"
import api from "../../rest/api"
import {GO} from "../../const/go"
import router from "../../router/router"

export default {

    [On.GO_IMPACT_ENTRY]: () => router.push({name: GO.IMPACT_ENTRY}),

    [On.CREATE_IMPACT_ENTRY]: async ({}, {color, name, grandeur}) => api.postImpactEntry({color, name, grandeur}),

    [On.SEARCH_IMPACT_ENTRY]: async ({}, {term}) => api.searchImpactEntry(term)
}