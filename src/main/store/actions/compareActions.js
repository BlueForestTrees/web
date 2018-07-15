import router from "../../router/router";
import On from "../../const/on";
import {GO} from "../../const/go";

export default {
    [On.GO_COMPARE]: ({state}, trees) => {
        router.push({name: GO.COMPARE, params: {leftId: trees[0]._id, rightId: trees[1]._id}});
    }
}