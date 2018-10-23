import On from "../../const/on"
import api from "../../rest/api"
import router from "../../router/router"
import {GO} from "../../const/go"
import {multiplyRessourceBqt} from "../../services/calculations"

export default {

    [On.GO_ROOT]: ({commit, state}, {treeId, rootId}) => {
        router.push({name: GO.ROOT, params: {treeId, rootId}})
    },
    [On.LOAD_ROOTS]: ({commit}, {_id, bqt}) =>
        api.getRoots(_id)
            .then(roots => multiplyRessourceBqt(bqt, roots)),
    [On.CREATE_ROOT]: ({commit}, {_id, trunkId, rootId, bqt, relativeTo}) => api.postRoot({_id, trunkId, rootId, bqt, relativeTo}),
    [On.UPDATE_ROOT]: ({commit}, {_id, trunkId, rootId, bqt}) => api.putRoot({_id, trunkId, rootId, bqt}),
    [On.DELETE_ROOT]: ({commit}, _id) => api.deleteRoot(_id)
}