import Vue from 'vue'
import Do from "../../const/do"

export default {
    [Do.SET_ROOTS]: ({}, {tree, roots}) => {
        Vue.set(tree, "roots", roots)
    }

}