import Do from "../../const/do"
import {FACETS} from "../../const/fragments"

export default {

    [Do.DELETE_FACET]: ({}, {tree, facet}) => {
        if (tree[FACETS]) {
            const facetIdx = tree[FACETS].indexOf(facet)
            if (facetIdx >= 0) {
                tree[FACETS].splice(facetIdx, 1)
            }
        }
    },


}