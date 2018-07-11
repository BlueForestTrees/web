import router from "../../router/router";
import {GO} from "../../const/go";
import On from "../../const/on";

export default {
    [On.SELECT_COMPARE]: ({state}) => {
        router.push({name: GO.COMPARE, params: {leftId: state.basket[0]._id, rightId: state.basket[1]._id}});
    },
};