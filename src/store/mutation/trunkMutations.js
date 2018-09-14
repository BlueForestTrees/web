import Vue from 'vue'
import Do from "../../const/do"

export default {
    [Do.SET_TRUNK]: ({}, {tree, trunk}) => {
        Vue.set(tree, "trunk", trunk)
    },
    [Do.RENAME_TRUNK]: (state, rename) => {
        Vue.set(rename.trunk, "name", rename.newName)
    },
    [Do.PUT_TRUNK_QUANTITY]: ({}, {trunk, quantity}) => {
        Vue.set(trunk, "quantity", quantity)
    },
}