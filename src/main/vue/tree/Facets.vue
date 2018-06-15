<template>
    <v-list v-if="hasItems" dense>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">PROPRIETE</h4>
                <span>Quantité, Prix, Dimensions, etc...</span>
            </v-tooltip>
            <v-spacer/>
            <v-icon @click="deleteItems" style="cursor: pointer" v-if="selectionNotEmpty()">delete</v-icon>
        </v-subheader>
        <v-divider/>

        <template v-for="item in items">
            <v-list-tile :key="item._id">
                <v-icon :style="'color: '+getRandomColor()+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import FacetDialog from "../dialog/FacetEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {getRandomColor, hasQuantity, qtUnitName} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import selectable from "../mixin/Selectable";
    import SetQtUnitDialog from "../dialog/SetQtUnitDialog";

    export default {
        components: {
            SetQtUnitDialog,
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
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0;
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
            deleteItems() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selection});
            },
            hasQuantity, getRandomColor
        }
    }
</script>