<template>
    <v-card v-if="facets">
        <v-toolbar>
            <v-toolbar-title>Propriétés</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="openAddFacetDialog" style="cursor: pointer">add</v-icon>
            <v-icon @click="deleteFacets" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
        </v-toolbar>
        <v-list two-line>
            <template v-for="facet in facets.items">
                <v-divider/>
                <v-list-tile :key="facet._id" @mouseover="overFacet = facet" @mouseout="overFacet = null">
                    <v-list-tile-content>
                        <v-list-tile-title>{{facet.name}}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="hasQuantity(facet)">{{facet.quantity.qt}}{{facet.quantity.unit}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <transition name="fadeInOut">
                            <v-checkbox v-if="isSelected() || overFacet && overFacet._id === facet._id"
                                        v-model="selectedFacets" :value="facet"/>
                        </transition>
                    </v-list-tile-action>
                    <v-list-tile-action>
                        <v-icon>keyboard_arrow_left</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </template>
            <v-divider/>
        </v-list>
    </v-card>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/mapper";

    export default {
        components: {
            FacetDialog
        },
        data() {
            return {
                Dial: Dial, selectedFacets: [], overFacet: null
            }
        },
        props: ['facets'],
        methods: {
            ...mapActions({dispatchDeleteFacets: On.DELETE_FACETS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            openAddFacetDialog() {
                this.showDialog({dialog: Dial.FACET});
            },
            deleteFacets() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selectedFacets});
            },
            isSelected() {
                return !_.isEmpty(this.selectedFacets);
            },
            clearSelection() {
                if (!_.isEmpty(this.selectedFacets)) {
                    this.selectedFacets = [];
                }
            },
            hasQuantity
        }
    }
</script>

<style>
    .list {
        padding: 0px;
    }


</style>