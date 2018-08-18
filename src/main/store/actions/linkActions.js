import On from "../../const/on"
import api from "../../rest/api"

export default {
    [On.UPDATE_LINK]: async ({commit}, {_id, trunkId, rootId, relativeTo, bqt}) => api.putLink({_id, trunkId, rootId, relativeTo, bqt}),
    [On.CREATE_LINK]: async ({commit}, {_id, trunkId, rootId, relativeTo, bqt}) => api.postLink({_id, trunkId, rootId, relativeTo, bqt}),
    [On.DELETE_LINK]: ({commit}, _id) => api.deleteLink(_id)
}
