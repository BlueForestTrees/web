<template>
    <v-list two-line>
        <v-subheader>
            <v-icon @click="addItem" style="cursor: pointer">add</v-icon>
            <v-tooltip top>
                <span slot="activator">Impacts</span>
                <span>Déchets, Pollutions, etc.</span>
            </v-tooltip>
            <v-spacer/>
            <v-tooltip top>
                <v-btn-toggle v-model="bilanFlag" slot="activator">
                    <v-btn flat><v-icon>filter_list</v-icon></v-btn>
                </v-btn-toggle>
                <span>Montrer le cumul</span>
            </v-tooltip>
            <span v-if="!bilan">
                <v-icon @click="deleteItems" style="cursor: pointer" v-if="selectionNotEmpty()">delete</v-icon>
            </span>
        </v-subheader>
        <template v-if="bilan" v-for="item in bilanItems">
            <v-divider/>
            <v-list-tile :key="'b'+item._id">
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
        <template v-if="!bilan" v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="'i'+item._id">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>

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
                Dial,
                bilanFlag: null
            }
        },
        mixins: [selectable],
        props: ['tree'],
        computed: {
            bilan: function () {
                return this.bilanFlag === 0;
            },
            bilanItems: function () {
                return this.tree && this.tree.impactsTank && this.tree.impactsTank.items;
            },
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