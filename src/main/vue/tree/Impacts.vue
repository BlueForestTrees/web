<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Impacts</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="openAddImpactDialog" style="cursor: pointer">add</v-icon>
            <v-icon @click="deleteImpacts" style="cursor: pointer" v-if="isSelected()">delete</v-icon>
        </v-toolbar>
        <v-list two-line v-if="tree.impacts">
            <template v-for="impact in tree.impacts.items">
                <v-divider/>
                <v-list-tile :key="impact._id" @mouseover="overImpact = impact" @mouseout="overImpact = null">
                    <v-list-tile-action>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{impact.name}}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="hasQuantity(impact)">
                            <qt-unit :quantity="impact.quantity"/>
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <transition name="fadeInOut">
                            <v-checkbox v-if="isSelected() || overImpact && overImpact._id === impact._id"
                                        v-model="selectedImpacts" :value="impact"/>
                        </transition>
                    </v-list-tile-action>
                </v-list-tile>
            </template>
            <v-divider/>
        </v-list>
    </v-card>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex';
    import ImpactDialog from "../dialog/ImpactEntryDialog";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {hasQuantity} from "../../services/calculations";
    import QtUnit from "../common/QtUnit";

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
        props: ['tree'],
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
                return !_.isEmpty(this.selectedImpacts);
            },
            clearSelection() {
                if (!_.isEmpty(this.selectedImpacts)) {
                    this.selectedImpacts = [];
                }
            },
            hasQuantity
        },
    }
</script>