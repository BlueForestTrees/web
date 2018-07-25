import On from "../../const/on";
import api from "../../rest/api";

export default {

    [On.CREATE_IMPACT_ENTRY]: async ({}, {color, name, grandeur}) => api.postImpactEntry({color, name, grandeur}),

    [On.SEARCH_IMPACT_ENTRY]: async ({}, {term}) => api.searchImpactEntry(term)
}