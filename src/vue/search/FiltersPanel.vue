<template>
    <v-layout column>
        <transition-group name="slide-bottom" mode="out-in">
            <template v-for="(panel,i) in visiblePanels">
                <component :key="panel.key" :is="panel.type" @input="v=>input(panel.mutation,v)" :value="search[panel.key]" @close="hidePanel(panel.key)" :class="i+1 < visiblePanels.length ? 'mb-2':'mb-3'"/>
            </template>
        </transition-group>
    </v-layout>
</template>

<script>
    import TypePanel from "./TypePanel"
    import TermPanel from "./TermPanel"
    import CategoriesPanel from "./CategoriesPanel"
    import OwnerPanel from "./OwnerPanel"
    import Do from "../../const/do"
    import {mapMutations, mapState} from "vuex"
    import TransitionExpand from "../common/TransitionExpand"
    import ImpactPanel from "./ImpactPanel"
    import FacetPanel from "./FacetPanel"

    export default {
        name: "FiltersPanel",
        components: {FacetPanel, ImpactPanel, TransitionExpand, TypePanel, TermPanel, CategoriesPanel, OwnerPanel},
        data: () => ({
            panels: {
                type: {key: "type", type: "type-panel", mutation: Do.SET_SEARCH_TYPE},
                term: {key: "term", type: "term-panel", mutation: Do.SET_SEARCH_TERM},
                cats: {key: "cats", type: "categories-panel", mutation: Do.SET_SEARCH_CATS},
                owner: {key: "owner", type: "owner-panel", mutation: Do.SET_SEARCH_OWNER},
                impact: {key: "impact", type: "impact-panel", mutation: Do.SET_SEARCH_IMPACT},
                facet: {key: "facet", type: "facet-panel", mutation: Do.SET_SEARCH_FACET}
            }
        }),
        computed: {
            visiblePanels() {
                return this.search.panels.map(key => this.panels[key])
            },
            ...mapState({
                search: s => s.search,
            }),
        },
        methods: {
            input(mutation, value) {
                this.$store.commit(mutation, value)
            },
            ...mapMutations({
                hidePanel: Do.HIDE_SEARCH_PANEL,
                setSearchCats: Do.SET_SEARCH_CATS,
                setSearchTerm: Do.SET_SEARCH_TERM,
                setSearchOwner: Do.SET_SEARCH_OWNER,
                setSearchImpact: Do.SET_SEARCH_IMPACT,
                setSearchFacet: Do.SET_SEARCH_FACET,
            })
        }
    }
</script>