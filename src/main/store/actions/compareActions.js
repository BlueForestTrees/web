import router from "../../router/router"
import On from "../../const/on"
import {GO} from "../../const/go"

export default {
    [On.GO_COMPARE]: ({state, getters}, trees) => {

        let dest = []

        if(trees) {
            dest.push(trees[0], trees[1])
        }else {
            if(state.compare.left){
                dest.push(state.compare.left)
            }
            if(state.compare.right){
                dest.push(state.compare.right)
            }
        }

        if(dest.length === 0){
            router.push({name: GO.COMPARE_EMPTY})
        }else if(dest.length === 1){
            router.push({name: GO.COMPARE_PARTIAL, params: {leftId: dest[0]._id}})
        }else {
            router.push({name: GO.COMPARE, params: {leftId: dest[0]._id, rightId: dest[1]._id}})
        }
    }
}