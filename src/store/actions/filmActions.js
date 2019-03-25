import On from "../../const/on"
import api from "../../rest/api"

export default {
    [On.GET_FILM]: ({}, _id) => api.getFilm(_id)

}
