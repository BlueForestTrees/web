<template>
    <v-list>
        <v-list-tile @click="showPanel('term')">
            <v-list-tile-avatar>
                <v-flex class="pencil logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Nom</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showPanel('type')">
            <v-list-tile-avatar>
                <v-flex class="type-panel logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Type</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showPanel('cats')">
            <v-list-tile-avatar>
                <v-flex class="bloc logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Catégories</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showPanel('owner')">
            <v-list-tile-avatar>
                <v-flex class="cravatte logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Propriétaire</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showPanel('impact')">
            <v-list-tile-avatar>
                <v-flex class="planet logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Environnement</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showPanel('facet')">
            <v-list-tile-avatar>
                <v-flex class="facet logo-petit mr-1"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Propriétés</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

    </v-list>
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
                setSearchOwner: Do.SET_SEARCH_OWNER,
                setSearchImpact: Do.SET_SEARCH_IMPACT,
                setSearchFacet: Do.SET_SEARCH_FACET,
            }),
            showPanel(name){
                this.$emit("input", name)
            }
        }
    }
</script>