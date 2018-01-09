<template>
    <v-card>
        <facet-dialog :dialog="Dial.FACET" :tree="tree"/>

        <v-toolbar>
            <v-toolbar-title>Caractéristiques</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
            <template v-for="facet in tree.facets">
                    <v-divider/>
                    <v-list-tile :key="facet.name" @mouseover="over(facet._id)">
                        <v-list-tile-action>
                            <v-icon>forward</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{facet.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{facet.qt}}{{facet.unit}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <flying-btn :fly="Fly.NEAR" @mousedown="sayhello(facet.name)"/>
                        </v-list-tile-action>
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
    import FlyingBtn from "../common/FlyingBtn";
    import {Fly} from "../../const/fly";


    export default {
        components: {
            FlyingBtn,
            FacetDialog},
        data() {
            return {
                Dial: Dial, Fly:Fly
            }
        },
        props: ['tree'],
        methods: {
            ...mapMutations([Do.SHOW_DIALOG]),
            sayhello(name){
                console.log(name);
            },
            over(facetId){
                console.log(facetId);
            },
            out(e,name){
                console.log("out tile", e.target,name);
            }
        }
    }
</script>

<style>
    .list {
        padding: 0px;
    }
</style>