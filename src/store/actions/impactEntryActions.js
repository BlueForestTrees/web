import On from "../../const/on"
import api from "../../rest/api"
import {GO} from "../../const/go"
import router from "../../router/router"

export default {

    [On.GO_IMPACT_ENTRY]: () => router.push({name: GO.IMPACT_ENTRY}),

    [On.CREATE_IMPACT_ENTRY]: async ({}, {_id, color, name, g}) => api.postImpactEntry({_id, color, name, g}),

    [On.SEARCH_IMPACT_ENTRY]: async ({}, {term}) => api.searchImpactEntry(term),

    [On.IMPORT_IMPACT_ENTRY_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("xlsx.ademe.impactEntry", file)
        return api.postImpactEntryAdeme(formData)
    }
}