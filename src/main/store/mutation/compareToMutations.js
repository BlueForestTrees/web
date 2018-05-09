import Vue from 'vue'
import Do from "../../const/do";


export default {

    [Do.INIT_COMPARE_TO]: (state, compareTo) => {
        Vue.set(state, "compareTo", compareTo);
    },

    [Do.SWAP_LEFT_RIGHT]: state => {
        const left = state.tree;
        const right = state.compareTo;

        Vue.set(state, "tree", right);
        Vue.set(state, "compareTo", left);
    },
}