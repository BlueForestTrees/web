import Vue from 'vue'
import Do from "../../const/do";


export default {

    [Do.SET_BRANCHES]: ({}, {tree, branches}) => {
        Vue.set(tree, "branches", branches);
    },
    [Do.ADD_BRANCHES]: ({}, {tree, branches}) => {
        tree.branches.items.push(...branches);
    },
    [Do.DELETE_BRANCH]: ({}, {tree, root}) => {
        if (tree.branches) {
            tree.branches.items.splice(tree.branches.items.indexOf(root), 1);
        }
    },
}