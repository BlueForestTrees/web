<template>
    <v-list two-line>
        <v-icon @click="openAddFacetDialog" style="cursor: pointer">add</v-icon>
        <v-icon @click="deleteFacets" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile :key="item._id" @mouseover="overFacet = item" @mouseout="overFacet = null">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-if="isSelected() || overFacet && overFacet._id === item._id" v-model="selectedFacets" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <v-divider/>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";

    export default {
        components: {
            QtUnit,
            FacetDialog
        },
        data() {
            return {
                Dial: Dial, selectedFacets: [], overFacet: null
            }
        },
        props: ['facets'],
        computed: {
            items: function () {
                return this.facets && this.facets.items;
            }
        },
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