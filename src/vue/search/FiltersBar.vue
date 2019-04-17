<template>
    <v-layout row align-center justify-center class="align">
        <filter-bar-btn title="Genre" @click="showPanel('type')"/>
        <filter-bar-btn title="Nom" @click="showPanel('term')"/>
        <filter-bar-btn title="Catégories" @click="showPanel('cats')"/>
        <filter-bar-btn title="Propriétaire" @click="showPanel('owner')"/>
        <filter-bar-btn title="Environnement" @click="showPanel('impact')"/>
        <filter-bar-btn title="Propriétés" @click="showPanel('facet')"/>
    </v-layout>
</template>

<script>
    import {mapState, mapMutations} from "vuex"
    import Do from "../../const/do"
    import ImpactPicker from "./ImpactPanel"
    import FacetPicker from "./FacetPanel"
    import FilterBarBtn from "./FilterBarBtn"

    export default {
        name: "FiltersBar",
        components: {FilterBarBtn, FacetPicker, ImpactPicker},
        computed: {
            ...mapState({
                search: s => s.search,
            }),
        },
        methods: {
            ...mapMutations({
                showPanel: Do.SHOW_SEARCH_PANEL,
                setSearchOwner: Do.SET_SEARCH_OWNER,
                setSearchImpact: Do.SET_SEARCH_IMPACT,
                setSearchFacet: Do.SET_SEARCH_FACET,
            })
        }
    }
</script>