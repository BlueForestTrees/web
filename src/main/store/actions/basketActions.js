import router from "../../router/router";
import {GO} from "../../const/go";
import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET});
    },
    [On.ADD_TO_BASKET]: ({commit}, items) => {
        commit(Do.ADD_TO_BASKET, items);
    }
};