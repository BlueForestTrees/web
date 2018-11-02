import On from "../../const/on"
import Do from "../../const/do"
import router from "../../router/router"
import {GO} from "../../const/go"
import api from "../../rest/api"

export default {
    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, trunk) => api.postTrunk(trunk),
    
    [On.LOAD_TRUNK]: ({commit}, {bqt, _id}) => api.getTrunk(_id)
        .then(trunk => (trunk.quantity.bqt = bqt || 1) && trunk),
    
    [On.RENAME_TRUNK]: ({commit}, {trunk, newName}) =>
        api.putTrunkName(trunk._id, newName)
            .then(() => commit(Do.RENAME_TRUNK, {trunk, newName})),
    
    [On.PUT_TRUNK_QUANTITY]: ({commit, dispatch}, {trunk, quantity}) =>
        api.putTrunkQuantity(trunk._id, quantity)
            .then(() => commit(Do.PUT_TRUNK_QUANTITY, {trunk, quantity}))
            .then(() => dispatch(On.LOAD_OPEN_TREE, {_id: trunk._id, bqt: trunk.quantity.bqt})),
    
    [On.CLONE_TRUNK]: ({}, _id) =>
        api.postTrunkClone(_id),
    
    [On.IMPORT_TRUNK_ADEME]: ({}, file) => {
        const formData = new FormData(file)
        formData.append("xlsx.ademe.trunk", file)
        return api.postTrunkAdeme(formData)
    }
}