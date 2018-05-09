<template>
    <v-list two-line>
        <v-list-tile avatar @click="showSetQtUnitDialog">
            <v-list-tile-content>
                <v-list-tile-title>{{title}}</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer/>
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
    import {qtUnitName} from "../../services/calculations";

    export default {
        components: {
            SetQtUnitDialog,
            UnitSelect,
            QtUnit
        },
        props: ['tree'],
        methods: {
            qtUnitName,
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            showSetQtUnitDialog() {
                this.showDialog({dialog: Dial.SET_QT_UNIT, data: {tree: this.tree}});
            }
        },
        computed: {
            title: function () {
                return qtUnitName(this.tree.trunk)
            }
        }
    }
</script>