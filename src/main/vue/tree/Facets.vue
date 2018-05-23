<template>
    <v-list two-line>
        <v-subheader>
            <v-icon @click="addItem" style="cursor: pointer">add</v-icon>
            <v-tooltip top>
                <span slot="activator">Propriétés</span>
                <span>Quantité, Prix, Dimensions, etc...</span>
            </v-tooltip>
            <v-spacer/>
            <v-icon @click="deleteItems" style="cursor: pointer" v-if="selectionNotEmpty()">delete</v-icon>
        </v-subheader>
        <v-divider/>
        <v-list-tile avatar @click="showSetQtUnitDialog">
            <v-list-tile-content>
                <v-list-tile-title>Quantité</v-list-tile-title>
                <v-list-tile-sub-title>
                    <qt-unit :quantity="tree.trunk.quantity"/>
                </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-spacer/>
        </v-list-tile>
        <template v-for="item in items">
            <set-qt-unit-dialog/>
            <v-list-tile :key="item._id">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <add-facet-dialog :tree="tree"/>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity, qtUnitName} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import AddFacetDialog from "../dialog/AddFacetDialog";
    import selectable from "../mixin/Selectable";

    export default {
        components: {
            AddFacetDialog,
            QtUnit,
            FacetDialog
        },
        data() {
            return {
                Dial: Dial
            }
        },
        mixins: [selectable],
        props: ['tree'],
        computed: {
            items: function () {
                return this.facets && this.facets.items;
            },
            facets: function () {
                return this.tree && this.tree.facets
            },
            quantity: function () {
                return qtUnitName({name: "Quantité", ...this.tree.trunk.quantity});
            }
        },
        methods: {
            qtUnitName,
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            showSetQtUnitDialog() {
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree: this.tree}});
            },
            ...mapActions({dispatchDeleteFacets: On.DELETE_FACETS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            addItem() {
                this.showDialog({dialog: Dial.ADD_FACET, data: {tree: this.tree}});
            },
            deleteItems() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selection});
            },
            hasQuantity
        }
    }
</script>