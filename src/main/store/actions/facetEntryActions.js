import On from "../../const/on";
import api from "../../rest/api";

export default {

    [On.CREATE_FACET_ENTRY]: async ({}, {name, grandeur}) => api.createFacetEntry({name, grandeur}),

    [On.SEARCH_FACET_ENTRY]: async ({}, {namepart}) => api.searchFacetEntry(namepart)
}