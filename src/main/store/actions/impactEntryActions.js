import On from "../../const/on";
import rest from "../../services/rest";

export default {

    [On.CREATE_IMPACT_ENTRY]: async ({}, {name, grandeur}) => rest.createImpactEntry({name, grandeur}),

    [On.SEARCH_IMPACT_ENTRY]: async ({}, {namepart}) => rest.searchImpactEntry(namepart)
}