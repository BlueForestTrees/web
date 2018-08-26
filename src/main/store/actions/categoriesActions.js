import On from "../../const/on"
import api from "../../rest/api"

export default {
    [On.LOAD_CATEGORIES]: async ({}, pid) => api.getCategories(pid),
    
    [On.IMPORT_CATEGORIE_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("xlsx.ademe.trunk", file)
        return api.postCategorieAdeme(formData)
    }
}
