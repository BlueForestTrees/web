<template>
    <v-layout row wrap align-center justify-center class="align" mb-1>
        <v-btn small flat round @click="showPanel('term')" class="text-none">
            <v-icon color="grey">search</v-icon>
            <span class="font-weight-medium subheading">Nom</span>
        </v-btn>
        <v-btn small flat round @click="showPanel('type')" class="text-none">
            <span class="mr-1 font-weight-bold subheading grey--text">?</span>
            <span class="font-weight-medium subheading">Genre</span>
        </v-btn>
        <v-btn small flat round @click="showPanel('cats')" class="text-none">
            <v-icon color="grey" class="mr-1">category</v-icon>
            <span class="font-weight-medium subheading">Catégories</span>
        </v-btn>
        <v-btn small flat round @click="showPanel('owner')" class="text-none">
            <v-icon color="grey" class="mr-1">people</v-icon>
            <span class="font-weight-medium subheading">Propriétaire</span>
        </v-btn>
        <v-btn small flat round @click="showPanel('impact')" class="text-none">
            <v-flex class="planet-gray logo-petit mr-1"/>
            <span class="font-weight-medium subheading">Environnement</span>
        </v-btn>
        <v-btn small flat round @click="showPanel('facet')" class="text-none">
            <v-flex class="facet-gray logo-petit mr-1"/>
            <span class="font-weight-medium subheading">Propriétés</span>
        </v-btn>
    </v-layout>
</template>

<script>
    import {mapState, mapMutations} from "vuex"
    import Do from "../../const/do"

    export default {
        name: "FiltersBar",
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