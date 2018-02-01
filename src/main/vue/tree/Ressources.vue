<template>
    <v-card>

        <configure-root-dialog :parent="beforeLast" :child="last"/>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <span class="air">

            <v-layout row wrap justify-center align-center>
                <v-breadcrumbs id="ressource_stack">
                  <v-icon slot="divider">keyboard_arrow_up</v-icon>
                  <v-breadcrumbs-item v-for="(tree,pathIndex) in path" :key="tree._id" v-if="tree.trunk">
                      <span @click="select(pathIndex,tree)">{{ tree.trunk.name }}</span>
                  </v-breadcrumbs-item>
                </v-breadcrumbs>
            </v-layout>

            <v-layout v-if="last.roots" row wrap justify-center align-center>
                <template v-for="root in last.roots.items">
                    <v-chip :key="root._id"
                            large color="primary" text-color="white"
                            @click="select(path.length, root)">
                            {{root.trunk.name}}
                    </v-chip>
                </template>
                <v-btn v-if="this.beforeLast" outline color="primary" fab small @click="configureLast">
                    <v-icon>build</v-icon>
                </v-btn>
                <v-btn outline color="primary" fab small @click="deleteLast">
                    <v-icon>delete</v-icon>
                </v-btn>
                <v-btn outline color="primary" fab small @click="addRessourceToLast">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-layout>
            <v-layout v-else row wrap justify-center align-center>
                <loading/>
            </v-layout>

        </span>
    </v-card>

</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";
    import Loading from "../common/Loading";
    import ConfigureRootDialog from "../dialog/ConfigureRootDialog";

    export default {
        components: {
            ConfigureRootDialog,
            Loading},
        props: ['tree'],
        data() {
            return {
                path: [this.tree]
            }
        },
        computed: {
            last: function () {
                return this.path[this.path.length - 1];
            },
            beforeLast: function () {
                if (this.path.length > 1)
                    return this.path[this.path.length - 2];
                else
                    return null;
            }
        },
        methods: {
            ...mapActions({dispatchDeleteRessources: On.DELETE_ROOT, dispatchPopulateRoots: On.POPULATE_ROOTS}),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            select(pathIndex, tree) {
                this.path.splice(pathIndex);
                this.path.push(tree);
                this.dispatchPopulateRoots(tree);
            },
            addRessourceToLast() {
                this.showDialog({dialog: Dial.RESSOURCE, data: {parentRessource: this.last}});
            },
            configureLast() {
                this.showDialog({dialog: Dial.CONFIGURE_ROOT});
            },
            deleteLast() {
                this.dispatchDeleteRessources({
                    tree: this.beforeLast,
                    root: this.last
                });
                this.path.splice(-1, 1);
            },
        }
    }
</script>

<style>
    #ressource_stack {
        flex-direction: column;
    }
</style>