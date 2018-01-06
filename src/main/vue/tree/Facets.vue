<template>
    <v-card>
        <facet-dialog :dialog="Dial.FACET" :tree="tree"/>

        <v-toolbar>
            <v-toolbar-title>Caractéristiques</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showDialog(Dial.FACET)">
                <v-icon>edit</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <template v-for="facet in tree.facets">
                <v-divider/>
                <v-list-tile :key="facet.name" @click="">
                    <v-list-tile-action>
                        <v-icon>forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{facet.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{facet.qt}}{{facet.unit}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
            <v-divider/>
        </v-list>
    </v-card>

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

<style>
    .list {
        padding: 0px;
    }
</style>