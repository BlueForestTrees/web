import Vue from 'vue'
import Do from "../../const/do"

export default {
    [Do.ADD_FACETS]: ({}, {tree, facets}) => {
        if (!tree.facets) {
            Vue.set(tree, "facets", facets)
        } else {
            tree.facets.items.push(facets)
        }
    },
    [Do.ADD_FACET]: ({}, {tree, facet}) => {
        if (tree.facets) {
            tree.facets.items.push(facet)
        } else {
            Vue.set(tree, "facets", [facet])
        }
    },

    [Do.DELETE_FACETS]: ({}, {facets, toDelete}) => {
        if (facets.items) {
            _.forEach(toDelete, facet => facets.items.splice(facets.items.indexOf(facet), 1))
        }
    },


}