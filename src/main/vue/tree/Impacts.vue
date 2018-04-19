<template>
    <v-list two-line>
        <v-icon @click="openAddImpactDialog" style="cursor: pointer">add</v-icon>
        <v-icon @click="deleteImpacts" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile :key="item._id" @mouseover="overImpact = item" @mouseout="overImpact = null">
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="hasQuantity(item)">
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-if="isSelected() || overImpact && overImpact._id === item._id" v-model="selectedImpacts" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <v-divider/>
    </v-list>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import ImpactDialog from "../dialog/ImpactEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";
    import {isEmpty} from 'lodash';

    export default {
        components: {
            QtUnit,
            ImpactDialog
        },
        data() {
            return {
                Dial: Dial, selectedImpacts: [], overImpact: null
            }
        },
        props: ['impacts'],
        computed: {
            items: function () {
                return this.impacts && this.impacts.items;
            }
        },
        methods: {
            ...mapActions({dispatchDeleteImpacts: On.DELETE_IMPACTS}),
            ...mapMutations([Do.SHOW_DIALOG]),
            openAddImpactDialog() {
                this.showDialog({dialog: Dial.IMPACT});
            },
            deleteImpacts() {
                this.dispatchDeleteImpacts({impacts: this.tree.impacts, toDelete: this.selectedImpacts});
            },
            isSelected() {
                return !isEmpty(this.selectedImpacts);
            },
            clearSelection() {
                if (!isEmpty(this.selectedImpacts)) {
                    this.selectedImpacts = [];
                }
            },
            hasQuantity
        },
    }
</script>