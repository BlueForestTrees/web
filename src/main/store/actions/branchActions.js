import On from "../../const/on"
import api from "../../rest/api"
import {multiplyRessourceBqt} from "../../services/calculations"

export default {
    [On.LOAD_BRANCHES]: ({commit}, {_id, bqt}) =>
        api.getBranches(_id)
            .then(branches => multiplyRessourceBqt(bqt, branches)),

    [On.CREATE_BRANCH]: async ({commit}, {_id, trunkId, branchId, bqt}) => api.postBranch({_id, trunkId, branchId, bqt}),
    [On.UPDATE_BRANCH]: async ({commit}, {_id, trunkId, branchId, bqt}) => api.putBranch({_id, trunkId, branchId, bqt}),
    [On.DELETE_BRANCH]: ({commit}, _id) => api.deleteBranch(_id)
}
