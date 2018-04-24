<template>
    <v-list two-line>
        <v-subheader>
            Ressources
            <v-spacer/>
            <v-btn icon @click="addItem">
                <v-icon>add</v-icon>
            </v-btn>
            <v-tooltip top>
                <span slot="activator"><v-icon color="grey lighten-1">info</v-icon></span>
                <span>Salut</span>
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

    export default {
        components: {
            AddRessourceDialog,
            QtUnit
        },
        props: ['tree'],
        computed: {
            items: function () {
                return this.tree && this.tree.roots && this.tree.roots.items;
            }
        },
        methods: {
            ...mapActions({
                dispatchDeleteLink: On.DELETE_LINK,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchLoadTree: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            addItem() {
                this.showDialog({dialog: Dial.ADD_RESSOURCE, data: {tree: this.tree}});
            }
        }
    }
</script>