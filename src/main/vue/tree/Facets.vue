<template>
        <span>
            <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :class="'active'">
                <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                {{qtUnitName(item) }}
            </v-list-tile>
        </span>
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
                selection: []
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
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            ...mapActions({dispatchDeleteFacets: On.DELETE_FACETS}),
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