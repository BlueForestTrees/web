<template>

    <v-card>
        <v-toolbar>
            <v-toolbar-title>Caractéristiques</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="openAddFacetDialog" style="cursor: pointer">add</v-icon>
            <v-icon @click="deleteFacets" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
        </v-toolbar>
        <v-list two-line>
            <template v-for="facet in tree.facets">
                <v-divider/>
                <v-list-tile :key="facet._id" @mouseover="overFacet = facet" @mouseout="overFacet = null">
                    <v-list-tile-action>
                        <v-icon>forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{facet.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{facet.qt}}{{facet.unit}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <transition name="fade">
                            <v-checkbox v-if="isSelected() || overFacet && overFacet._id === facet._id" v-model="selectedFacets" :value="facet"/>
                        </transition>
                    </v-list-tile-action>
                </v-list-tile>
            </template>
            <v-divider/>
        </v-list>
    </v-card>

</template>

<script>
    import {Do} from "../../const/do"
    import {mapMutations, mapActions} from 'vuex';
    import FacetDialog from "../dialog/FacetEntryDialog";
    import {Dial} from "../../const/dial";
    import FlyingBtn from "../common/FlyingBtn";
    import {Fly} from "../../const/fly";
    import {On} from "../../const/on";


    export default {
        components: {
            FlyingBtn,
            FacetDialog
        },
        data() {
            return {
                Dial: Dial, Fly: Fly, selectedFacets:[], overFacet:null
            }
        },
        props: ['tree'],
        methods: {
            ...mapActions({dispatchDeleteFacets:On.DELETE_FACETS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            openAddFacetDialog(){
                this.showDialog(Dial.FACET);
            },
            deleteFacets(){
                this.dispatchDeleteFacets({tree:this.tree, facets:this.selectedFacets});
            },
            isSelected(){
                return !_.isEmpty(this.selectedFacets);
            }
        }
    }
</script>

<style>
    .list {
        padding: 0px;
    }

    .fade-enter-active{
        transition: opacity .35s
    }
    .fade-leave-active {
        transition: opacity 0s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>