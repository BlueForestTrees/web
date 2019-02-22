import On from "../../const/on"
import api from "../../rest/api"
import {deleteCatch} from "./commons"

export default {
    [On.CHECK_NAME_AVAILABLE]: ({}, name) => api.checkInfoAvailable(name).then(r => r.available),
    [On.SAVE_INFO]: ({}, info) => api.postInfo(info),
    [On.UPDATE_INFO]: ({}, info) => api.putInfo(info),
    [On.DELETE_INFO]: ({dispatch}, info) => deleteCatch(dispatch, api.deleteInfo(info)),
    [On.GET_INFO]: ({}, {_id, path}) => _id ? api.getInfo(_id) : api.getInfoByPath(path),
    [On.SEARCH_INFO]: ({}, query) => api.searchInfo(query)
}
