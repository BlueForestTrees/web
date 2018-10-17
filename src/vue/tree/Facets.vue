<template>
    <v-list>
        <template v-if="hasItems" v-for="item in items">
            <v-layout row align-center :key="item._id">
                <v-icon :style="{color:item.color}">lens</v-icon>
                {{qtUnitName(item)}}
            </v-layout>
            <v-divider/>
        </template>
        <v-list-tile v-if="!hasItems">
            <h5>Pas encore d'informations</h5>
        </v-list-tile>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {getRandomColor, hasQuantity, qtUnitName} from "../../services/calculations"
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            QtUnit,
        },
        data() {
            return {
                Dial,
                // selection: []
            }
        },
        mixins: [selectable],
        props: ['tree'],
        computed: {
            items: function () {
                return this.facets
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0
            },
            facets: function () {
                return this.tree && this.tree.facets
            },
            quantity: function () {
                return qtUnitName({name: "Quantité", ...this.tree.trunk.quantity})
            }
        },
        methods: {
            ...mapActions({showDialog: On.SHOW_DIALOG, dispatchDeleteFacets: On.DELETE_FACETS}),
            deleteItems() {
                this.dispatchDeleteFacets({facets: this.facets, toDelete: this.selection})
            },
            qtUnitName, hasQuantity, getRandomColor
        }
    }
</script>

<style>
    .selected {
        color: #FF0000
    }
</style>