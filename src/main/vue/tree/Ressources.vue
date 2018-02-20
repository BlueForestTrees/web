<template>
    <v-card>
        <configure-root-dialog :trunk="beforeLast" :root="last"/>
        <add-ressource-dialog :tree="last" v-if="last"/>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container grid-list-md text-xs-center v-if="last && last.trunk">
            <v-layout row>
                <v-flex>
                    <ressource-bar :path="path" @delete="deleteLast" @select="select" @load="load"/>
                    <ressource-list :last="last" @select="select(path.length, $event)" @add="addRessourceToLast"/>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import ConfigureRootDialog from "../dialog/ConfigureRootDialog";
    import AddRessourceDialog from "../dialog/AddRessourceDialog";
    import RessourceBar from "../common/RessourceBar";
    import RessourceList from "../common/RessourceList";
    import {Dial} from "../../const/dial";

    export default {
        components: {
            RessourceList,
            RessourceBar,
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
        beforeMount:function(){
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
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchLoad: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            select(pathIndex, tree) {
                this.path.splice(pathIndex);
                this.path.push(tree);
                this.dispatchLoadRoots(tree);
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
            load(idx, item){
                this.dispatchLoad(item);
            }
        }
    }
</script>