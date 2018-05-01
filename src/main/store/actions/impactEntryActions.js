import On from "../../const/on";
import api from "../../rest/api";

export default {

    [On.CREATE_IMPACT_ENTRY]: async ({}, {name, grandeur}) => api.createImpactEntry({name, grandeur}),

    [On.SEARCH_IMPACT_ENTRY]: async ({}, {term}) => api.searchImpactEntry(term)
}