import On from "../../const/on"
import api from "../../rest/api"

export default {
    [On.CHECK_NAME_AVAILABLE]: ({}, name) => api.checkInfoAvailable(name).then(r => r.available),
    [On.SAVE_INFO]: ({}, info) => api.postInfo(info),
    [On.UPDATE_INFO]: ({}, info) => api.putInfo(info),
    [On.GET_INFO]: ({}, {_id, path}) => _id ? api.getInfo(_id) : api.getInfoByPath(path),
    [On.GET_USER_INFOS]: ({}, oid) => api.getInfoByUser(oid)
}
