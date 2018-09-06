import Vue from 'vue'
import Do from "../../const/do"

export default {
    [Do.SET_ROOTS]: ({}, {tree, roots}) => {
        Vue.set(tree, "roots", roots)
    },
    [Do.ADD_ROOT]: ({}, {tree, root}) => {
        tree.roots.push(root)
    },
    
    [Do.DELETE_ROOT]: ({}, {tree, root}) => {
        if (tree.roots) {
            tree.roots.items.splice(tree.roots.items.indexOf(root), 1)
        }
    },
}