import On from "../../const/on"
import api from "../../rest/api"
import router from "../../router/router"
import {GO} from "../../const/go"

export default {

    [On.GO_FACET_ENTRY]: () => router.push({name: GO.FACET_ENTRY}),

    [On.CREATE_FACET_ENTRY]: async ({}, {color, name, grandeur}) => api.postFacetEntry({color, name, grandeur}),

    [On.SEARCH_FACET_ENTRY]: async ({}, {term}) => api.searchFacetEntry(term)
}