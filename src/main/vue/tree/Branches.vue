<template>
    <v-list two-line>
        <v-icon @click="addItem" style="cursor: pointer">add</v-icon>
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
                    <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import {Dial} from "../../const/dial";
    import items from "../../const/items";
    import QtUnit from "../common/QtUnit";

    export default {
        components: {
            QtUnit
        },
        props: ['tree'],
        computed: {
            items: function () {
                return this.tree && this.tree.branches && this.tree.branches.items;
            }
        },
        methods: {
            ...mapActions({
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchLoadTree: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            addItem() {
                this.showDialog({dialog: Dial.ADD_ITEM, data: {tree: this.tree, item: items.BRANCH}});
            }
        }
    }
</script>