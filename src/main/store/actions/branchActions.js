import On from "../../const/on"
import api from "../../rest/api"
import omit from 'lodash.omit'
import Do from "../../const/do"
import {hasQuantity, trunkyAll} from "../../services/calculations"

export default {

    [On.LOAD_BRANCHES]: ({commit}, tree) => {

        const loadBranches = hasQuantity(tree.trunk) ?
            api.getQuantifiedBranches(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
            :
            api.getUnquantifiedBranches(tree._id)

        return loadBranches
            .then(branches => ({
                ...omit(branches, "items"),
                items: trunkyAll(branches.items)
            }))
            .then(branches => commit(Do.SET_BRANCHES, {tree, branches}))
    }
}
