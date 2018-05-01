<template>
    <v-list two-line>
        <v-subheader>Description
            <v-spacer/>
            <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
        </v-subheader>
        <v-list-tile avatar @click="">
            <v-list-tile-content>
                <v-list-tile-title>Nom</v-list-tile-title>
                <v-list-tile-sub-title>{{tree.trunk.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
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
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            showSetQtUnitDialog() {
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree: this.tree}});
            }
        }
    }
</script>