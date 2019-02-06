import On from "../../const/on"
import api from "../../rest/api"
import router from "../../router/router"
import {GO} from "../../const/go"
import {applyRessourceCoef, createStringObjectId, treeBqt} from "../../services/calculations"
import {BRANCHES, ROOTS} from "../../const/fragments"

export default {

    [On.GO_ROOT]: ({commit, state}, {treeId, rootId}) => {
        router.push({name: GO.ROOT, params: {treeId, rootId}})
    },
    [On.ADD_ROOT]: ({commit, dispatch}, {tree, root}) => {
        const item = {
            _id: createStringObjectId(),
            trunkId: tree._id,
            rootId: root._id,
            bqt: treeBqt(root) / treeBqt(tree),
        }

        if (tree[ROOTS]) {
            tree[ROOTS].push(root)
        }
        if (root[BRANCHES]) {
            root[BRANCHES].push(tree)
        }

        return dispatch(On.CREATE_ROOT, item)
    },
    [On.CREATE_ROOT]: async ({commit}, {_id, trunkId, rootId, bqt, relativeTo}) => api.postRoot({_id, trunkId, rootId, bqt, relativeTo}),
    [On.LOAD_ROOTS]: ({commit}, {_id, bqt}) =>
        api.getRoots(_id)
            .then(roots => applyRessourceCoef(bqt, roots)),
    [On.UPDATE_ROOT]: ({commit}, {_id, trunkId, rootId, bqt}) => api.putRoot({_id, trunkId, rootId, bqt}),
    [On.DELETE_ROOT]: ({commit}, _id) => api.deleteRoot(_id)
}
