<template>
    <v-list two-line>
        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>Nom</v-list-tile-title>
                <v-list-tile-sub-title>{{tree.trunk.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-spacer/>
            <v-btn icon @click="closeTree">
                <v-icon x-large>clear</v-icon>
            </v-btn>
        </v-list-tile>
        <v-list-tile @click="showSetQtUnitDialog">
            <v-list-tile-content>
                <v-list-tile-title>Quantité de référence</v-list-tile-title>
                <v-list-tile-sub-title>
                    <qt-unit :quantity="tree.trunk.quantity"/>
                </v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <set-qt-unit-dialog/>
    </v-list>
</template>

<script>
    import {mapMutations} from 'vuex';
    import QtUnit from "../common/QtUnit";
    import UnitSelect from "../common/UnitSelect";
    import SetQtUnitDialog from "../dialog/SetQtUnitDialog";
    import Do from "../../const/do";
    import {Dial} from "../../const/dial";

    export default {
        components: {
            SetQtUnitDialog,
            UnitSelect,
            QtUnit
        },
        props: ['tree'],
        methods: {
            ...mapMutations({showDialog: Do.SHOW_DIALOG, closeTree: Do.CLOSE_TREE}),
            showSetQtUnitDialog() {
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree: this.tree}});
            }
        }
    }
</script>