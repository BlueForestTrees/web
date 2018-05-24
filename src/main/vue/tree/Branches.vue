<template>
    <v-list two-line>
        <v-subheader>
            <v-icon @click="showAddBranchDialog" style="cursor: pointer">add</v-icon>
            <v-tooltip top>
                <span slot="activator">Usages</span>
                <span>Utilisé pour...</span>
            </v-tooltip>
            <v-spacer/>
            <v-icon @click="open" style="cursor: pointer" v-if="oneSelected()">launch</v-icon>
        </v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="item.trunk.name" @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.trunk.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.trunk.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <add-usage-dialog/>
    </v-list>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import {Dial} from "../../const/dial";
    import QtUnit from "../common/QtUnit";
    import AddUsageDialog from "../dialog/AddUsageDialog";
    import selectable from "../mixin/Selectable";

    export default {
        components: {
            AddUsageDialog,
            QtUnit
        },
        props: ['tree'],
        mixins: [selectable],
        computed: {
            items: function () {
                return this.tree && this.tree.branches && this.tree.branches.items;
            }
        },
        methods: {
            ...mapActions({
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            showAddBranchDialog() {
                this.showDialog({dialog: Dial.ADD_USAGE, data: {tree: this.tree}});
            }
        }
    }
</script>