import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import router from "../../router/router"
import {GO} from "../../const/go"
import {multiplyBqt, trunkyAll} from "../../services/calculations"

export default {
    
    [On.GO_ROOT]: ({commit, state}, {treeId, rootId}) => {
        router.push({name: GO.ROOT, params: {treeId, rootId}})
    },
    [On.LOAD_ROOTS]: ({commit}, tree) =>
        api.getRoots(tree._id)
            .then(roots => multiplyBqt(tree.trunk.quantity.bqt, roots))
            .then(trunkyAll)
            .then(roots => commit(Do.SET_ROOTS, {tree, roots}))
}
