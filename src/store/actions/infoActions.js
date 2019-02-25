import On from "../../const/on"
import api from "../../rest/api"
import {deleteCatch} from "./commons"
import router from "../../router/router"
import {infoType} from "../../const/infoType"

export default {
    [On.GO_EDIT_INFO]: ({}, {type, path}) => router.push({name: infoType[type].go, params: {path}}),
    [On.CHECK_NAME_AVAILABLE]: ({}, name) => api.checkInfoAvailable(name).then(r => r.available),
    [On.SAVE_INFO]: ({}, info) => api.postInfo(info),
    [On.SAVE_EQ]: ({}, info) => api.postInfo({...info, type: 'eq'}),
    [On.SAVE_GROUP]: ({}, info) => api.postInfo({...info, type: 'gr'}),
    [On.SAVE_ALT]: ({}, info) => api.postInfo({...info, type: 'alt'}),
    [On.SAVE_COMP]: ({}, info) => api.postInfo({...info, type: 'comp'}),
    [On.UPDATE_INFO]: ({}, info) => api.putInfo(info),
    [On.DELETE_INFO]: ({dispatch}, info) => deleteCatch(dispatch, api.deleteInfo(info)),
    [On.GET_INFO]: ({}, {_id, path}) => _id ? api.getInfo(_id) : api.getInfoByPath(path),
    [On.SEARCH_INFO]: ({}, query) => api.searchInfo(query),
}
