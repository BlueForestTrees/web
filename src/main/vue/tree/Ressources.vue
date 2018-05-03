<template>
    <v-list two-line>
        <v-subheader>
            Ressources
            <v-spacer/>
            <v-icon @click="open" style="cursor: pointer" v-if="oneSelected()">launch</v-icon>
            <v-icon @click="addItem" style="cursor: pointer">add</v-icon>
            <v-tooltip top>
                <span slot="activator"><v-icon color="grey lighten-1">info</v-icon></span>
                <span>"RESSOURCES" : Ce sont les éléments qui ont été utilisés.<br>Il y en a 3 types : Energie, travail, matière première, mais aussi autre élément.</span>
            </v-tooltip>
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
        <add-ressource-dialog/>
    </v-list>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import {Dial} from "../../const/dial";
    import QtUnit from "../common/QtUnit";
    import AddRessourceDialog from "../dialog/AddRessourceDialog";
    import selectable from "../mixin/Selectable";

    export default {
        components: {
            AddRessourceDialog,
            QtUnit
        },
        mixins: [selectable],
        props: ['tree'],
        computed: {
            items: function () {
                return this.tree.roots.items;
            },
        },
        methods: {
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            ...mapActions({
                dispatchDeleteLink: On.DELETE_LINK,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            addItem() {
                this.showDialog({dialog: Dial.ADD_RESSOURCE, data: {tree: this.tree}});
            }
        }
    }
</script>