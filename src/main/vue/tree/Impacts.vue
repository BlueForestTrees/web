<template>
    <v-list two-line>
        <v-subheader>Impacts
            <v-spacer/>
            <v-icon @click="deleteItems" style="cursor: pointer" v-if="selectionNotEmpty()">delete</v-icon>
            <v-icon @click="addItem" style="cursor: pointer">add</v-icon>
            <v-tooltip top>
                <span slot="activator"><v-icon color="grey lighten-1">info</v-icon></span>
                <span>IMPACTS : Ce sont les déchets, les polutions, etc.</span>
            </v-tooltip>

        </v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile :key="item._id">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <v-divider/>
        <add-impact-dialog/>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import {isEmpty} from 'lodash';
    import AddImpactDialog from "../dialog/AddImpactDialog";
    import selectable from "../mixin/Selectable";

    export default {
        components: {
            AddImpactDialog,
            QtUnit,
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
            hasQuantity
        },
    }
</script>