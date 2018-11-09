import Do from "../../const/do"

export default {

    [Do.DELETE_FACETS]: ({}, {facets, toDelete}) => {
        if (facets.items) {
            _.forEach(toDelete, facet => facets.items.splice(facets.items.indexOf(facet), 1))
        }
    },


}