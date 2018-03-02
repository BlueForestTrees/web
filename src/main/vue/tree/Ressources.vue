<template>
    <v-card>
        <configure-root-dialog :trunk="beforeLast" :root="last"/>
        <add-ressource-dialog :tree="last" v-if="last"/>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container V-if="last && last.trunk">
            <item-path :path="path" @delete="deleteLast" @select="select" @load="load"/>
            <item-list :dir="last.roots" @select="select(path.length, $event)" @add="addRessourceToLast"/>
        </v-container>
    </v-card>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import ConfigureRootDialog from "../dialog/ConfigureRootDialog";
    import AddRessourceDialog from "../dialog/AddRessourceDialog";
    import {Dial} from "../../const/dial";
    import ItemList from "../common/ItemList";
    import ItemPath from "../common/ItemPath";

    export default {
        components: {
            ItemPath,
            ItemList,
            AddRessourceDialog,
            ConfigureRootDialog
        },
        props: ['tree'],
        data() {
            return {
                path: []
            }
        },
        watch: {
            tree(val) {
                this.path = [val];
            }
        },
        beforeMount: function () {
            this.path = [this.tree];
        },
        computed: {
            last: function () {
                if (this.path.length > 0)
                    return this.path[this.path.length - 1];
                else
                    return null;
            },
            beforeLast: function () {
                if (this.path.length > 1)
                    return this.path[this.path.length - 2];
                else
                    return null;
            }
        },
        methods: {
            ...mapActions({
                dispatchDeleteRessources: On.DELETE_ROOT,
                dispatchLoadBranches: On.LOAD_ROOTS,
                dispatchLoad: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            select(pathIndex, tree) {
                this.path.splice(pathIndex);
                this.path.push(tree);
                this.dispatchLoadBranches(tree);
            },
            deleteLast() {
                this.dispatchDeleteRessources({
                    tree: this.beforeLast,
                    root: this.last
                });
                this.path.splice(-1, 1);
            },
            addRessourceToLast() {
                this.showDialog({dialog: Dial.RESSOURCE, data: {parentRessource: this.last}});
            },
            load(idx, item) {
                this.dispatchLoad(item);
            }
        }
    }
</script>