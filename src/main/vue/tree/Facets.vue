<template>
    <span>
    <h2>Caractéristiques</h2>
    <v-list>
        <facet-dialog :data="facetDialog" :tree="tree"/>
        <v-list-tile avatar if="tree.facets" v-for="facet in tree.facets" v-bind:key="facet.name" @click="">
            <v-list-tile-avatar>
                <v-icon>assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>{{facet.qt}}{{facet.unit}} {{facet.name}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
            <v-list-tile-avatar @click="showFacetDialog">
                <v-icon>add</v-icon>
            </v-list-tile-avatar>
        </v-list-tile>
    </v-list>
    </span>
</template>

<script>
    import {Dial, Do} from "../../store/keys"
    import {mapState, mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetDialog";


    export default {
        components: {FacetDialog},
        name: "facets",
        props: ['tree'],
        computed: {
            ...mapState({
                "facetDialog": state => state.dialogs[Dial.FACET]
            })
        },
        methods: {
            ...mapMutations([Do.SHOW_FACET_DIALOG])
        }
    }
</script>