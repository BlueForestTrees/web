import On from "../../const/on"
import api from "../../rest/api"

export default {

    [On.CREATE_FACET_ENTRY]: async ({}, {color, name, grandeur}) => api.postFacetEntry({color, name, grandeur}),

    [On.SEARCH_FACET_ENTRY]: async ({}, {namepart}) => api.searchFacetEntry(namepart)
}