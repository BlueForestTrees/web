<template>
    <v-card>
        <v-list dense>
            <v-subheader>
                <v-tooltip top>
                    <h4 slot="activator">PROPRIETES</h4>
                    <span>Quantité, Prix, Dimensions, etc...</span>
                </v-tooltip>
            </v-subheader>

            <template v-for="item in items">
                <v-list-tile :key="item._id" @click="toggleSelect(item)" :class="'active'">
                    <v-icon :style="'color: '+item.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName(item) }}
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {getRandomColor, hasQuantity, qtUnitName} from "../../services/calculations"
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"

    export default {
        components: {
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
                return this.facets && this.facets.items
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