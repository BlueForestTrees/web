<template>
    <span>
    <h2>Caractéristiques</h2>
    <facet-dialog :dialog="Dial.FACET" :tree="tree"/>

    <v-text-field placeholder="Quantité Unité"/>
    <v-text-field placeholder="Prix"/>

    <v-list>
        <v-list-tile avatar if="tree.facets" v-for="facet in tree.facets" v-bind:key="facet.name" @click="">
            <v-list-tile-avatar>
                <v-icon>assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>{{facet.qt}}{{facet.unit}} {{facet.name}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
            <v-list-tile-avatar @click="showDialog(Dial.FACET)">
                <v-icon>add</v-icon>
            </v-list-tile-avatar>
        </v-list-tile>
    </v-list>
    </span>

</template>

<script>
    import {Do} from "../../const/do"
    import {mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetDialog";
    import {Dial} from "../../const/dial";


    export default {
        components: {FacetDialog},
        data() {
            return {
                Dial: Dial
            }
        },
        props: ['tree'],
        methods: {
            ...mapMutations([Do.SHOW_DIALOG])
        }
    }
</script>