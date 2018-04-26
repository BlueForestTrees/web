<template>
    <v-list two-line>
        <v-subheader>Propriétés<v-spacer/>
            <v-icon @click="deleteFacets" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
            <v-btn icon @click="addItem"><v-icon>add</v-icon></v-btn>
            <v-icon color="grey lighten-1">info</v-icon>
        </v-subheader>
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
        <add-facet-dialog/>
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
    import {isEmpty} from 'lodash';
    import AddFacetDialog from "../dialog/AddFacetDialog";

    export default {
        components: {
            AddFacetDialog,
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
            addItem() {
                this.showDialog({dialog: Dial.FACET});
            },
            deleteFacets() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selectedFacets});
            },
            isSelected() {
                return !isEmpty(this.selectedFacets);
            },
            clearSelection() {
                if (!isEmpty(this.selectedFacets)) {
                    this.selectedFacets = [];
                }
            },
            hasQuantity
        }
    }
</script>