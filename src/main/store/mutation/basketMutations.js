import Do from "../../const/do";
import {find} from 'lodash';

export default {
    [Do.ADD_TO_BASKET]: (state, item) => {
        if (!find(state.basket, {_id: item._id})) {
            state.basket.push(item);
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, item) => {
        state.basket.splice(state.basket.indexOf(item), 1);
    },
}