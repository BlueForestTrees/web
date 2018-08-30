import router from "../../router/router"
import {GO} from "../../const/go"
import On from "../../const/on"
import Do from "../../const/do"
import {find} from "unit-manip"

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET})
    },
    [On.ADD_TO_BASKET]: ({commit, dispatch}, items) => {
        commit(Do.ADD_TO_BASKET, items)
    },
    [On.REMOVE_FROM_BASKET]: ({state, commit, dispatch}, items) => {
        commit(Do.REMOVE_FROM_BASKET, items)
        if(state.tree){
            if(find(items, "_id",state.tree._id)){
                commit(Do.CLOSE_TREE)
            }
        }
        if(state.compare.left){
            if(find(items, "_id",state.compare.left._id)){
                commit(Do.CLOSE_COMPARE_LEFT)
            }
        }
        if(state.compare.right){
            if(find(items, "_id",state.compare.right._id)){
                commit(Do.CLOSE_COMPARE_RIGHT)
            }
        }
    }
}