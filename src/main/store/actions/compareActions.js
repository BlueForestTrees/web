import router from "../../router/router"
import On from "../../const/on"
import {GO} from "../../const/go"
import {find} from "unit-manip"

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
            const basketItems = getters.basketArray
            let nbToFind = 2 - dest.length
            for(let i = 0; i < basketItems.length && nbToFind > 0; i++){
                const item = basketItems[i]
                if(!find(dest, "_id", item._id)){
                    dest.push(item)
                    nbToFind--
                }
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