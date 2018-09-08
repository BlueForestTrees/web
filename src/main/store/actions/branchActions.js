import On from "../../const/on"
import api from "../../rest/api"
import {multiplyRessourceBqt} from "../../services/calculations"

export default {
    [On.LOAD_BRANCHES]: ({commit}, {_id, bqt}) =>
        api.getBranches(_id)
            .then(branches => multiplyRessourceBqt(bqt, branches)),

    [On.CREATE_BRANCH]: async ({commit, dispatch}, {_id, trunkId, branchId, bqt}) => dispatch(On.CREATE_BRANCH,{_id, trunkId:branchId, rootId:trunkId, bqt:1/bqt}),
    [On.UPDATE_BRANCH]: async ({commit, dispatch}, {_id, trunkId, branchId, bqt}) => dispatch(On.CREATE_BRANCH,{_id, trunkId:branchId, rootId:trunkId, bqt:1/bqt}),
    [On.DELETE_BRANCH]: ({commit, dispatch}, _id) => dispatch(On.DELETE_ROOT, _id)
}
