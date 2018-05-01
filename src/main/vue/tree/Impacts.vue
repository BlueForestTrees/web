<template>
    <v-list two-line>
        <v-subheader>Impacts
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
        <impact-dialog/>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import ImpactDialog from "../dialog/ImpactDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import {isEmpty} from 'lodash';
//TODO suppression d'impact bug

    export default {
        components: {
            QtUnit,
            ImpactDialog
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
                return this.impacts && this.impacts.items;
            },
            impacts: function () {
                return this.tree && this.tree.impacts;
            }
        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            addItem() {
                this.showDialog({dialog: Dial.IMPACT, data: {tree: this.tree}});
            },


            deleteItems() {
                this.dispatchDeleteImpacts({impacts: this.tree.impacts, toDelete: this.selection});
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
        },
    }
</script>