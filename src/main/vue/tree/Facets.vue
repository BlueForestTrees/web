<template>
    <v-list two-line>
        <v-subheader>Propriétés
            <v-spacer/>
            <v-icon @click="deleteItems" style="cursor: pointer" v-if="selectionNotEmpty()">delete</v-icon>
            <v-btn icon @click="addItem">
                <v-icon>add</v-icon>
            </v-btn>
            <v-icon color="grey lighten-1">info</v-icon>
        </v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile :key="item._id" @mouseover="overItem = item" @mouseout="overItem = null">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-if="selectionNotEmpty() || overItem && overItem._id === item._id" v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <v-divider/>
        <add-facet-dialog :tree="tree"/>
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
                Dial: Dial,

                selection: [], overItem: null
            }
        },
        props: ['tree'],
        computed: {
            items: function () {
                return this.facets && this.facets.items;
            },
            facets: function () {
                return this.tree && this.tree.facets
            }
        },
        methods: {
            ...mapActions({dispatchDeleteFacets: On.DELETE_FACETS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            addItem() {
                this.showDialog({dialog: Dial.ADD_FACET, data: {tree: this.tree}});
            },


            deleteItems() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selection});
            },
            selectionNotEmpty() {
                return !isEmpty(this.selection);
            },
            clearSelection() {
                if (!isEmpty(this.selection)) {
                    this.selection = [];
                }
            },


            hasQuantity
        }
    }
</script>