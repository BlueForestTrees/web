<template>
    <div class="align">
        <type-picker @input="setSearchType" :value="search.type"/>
        <term-picker @input="setSearchTerm" :value="search.term"/>
        <cat-picker @input="setSearchCats" :value="search.cats"/>
        <owner-picker @input="setSearchOwner" :value="search.owner"/>
        <impact-picker @input="setSearchImpact" :value="search.impact"/>
        <facet-picker @input="setSearchFacet" :value="search.facet"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex"
    import CatPicker from "./CatPicker"
    import Do from "../../const/do"
    import OwnerPicker from "./OwnerPicker"
    import TermPicker from "./TermPicker"
    import ImpactPicker from "./ImpactPicker"
    import FacetPicker from "./FacetPicker"
    import TypePicker from "./TypePicker"

    export default {
        name: "FilterPanel",
        components: {TypePicker, FacetPicker, ImpactPicker, TermPicker, OwnerPicker, CatPicker},
        computed: {
            ...mapState({
                search: s => s.search,
            }),
        },
        methods: {
            ...mapMutations({
                setSearchType: Do.SET_SEARCH_TYPE,
                setSearchCats: Do.SET_SEARCH_CATS,
                setSearchTerm: Do.SET_SEARCH_TERM,
                setSearchOwner: Do.SET_SEARCH_OWNER,
                setSearchImpact: Do.SET_SEARCH_IMPACT,
                setSearchFacet: Do.SET_SEARCH_FACET,
            })
        }
    }
</script>