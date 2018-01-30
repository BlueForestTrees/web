<template>
    <v-card>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <span class="air" v-if="tree.roots">
            <template v-for="(trunk,pathIndex) in path" v-if="trunk.roots">
                    <v-layout :key="trunk._id" row wrap justify-center align-center>
                        <v-chip v-for="root in trunk.roots.items" :key="root._id"
                                outline color="primary" fab dark large
                                @click="select(pathIndex,root)" @blur="unselect(root)"
                                @input="deleteRessource(pathIndex, trunk, root)"
                                :close="root.selected">
                            <v-icon left v-if="root.selected" @click="">build</v-icon>
                            {{root.name}}
                        </v-chip>

                        <v-btn outline color="primary" fab small @click="addRessourceTo(path[pathIndex])">
                            <v-icon>add</v-icon>
                        </v-btn>

                    </v-layout>
            </template>
        </span>
    </v-card>

</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";

    export default {
        props: ['tree'],
        data() {
            return {
                path: [this.tree]
            }
        },
        methods: {
            ...mapActions({dispatchDeleteRessources: On.DELETE_ROOT, dispatchLoadRoots: On.LOAD_ROOTS}),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            async select(pathIndex, root) {
                this.path.splice(pathIndex + 1);
                this.path.push(root);
                root.selected = true;
                this.dispatchLoadRoots(root);
            },
            unselect(root) {
                root.selected = false;
            },
            addRessourceTo(ressource) {
                this.showDialog({dialog: Dial.RESSOURCE, data: {parentRessource: ressource}});
            },
            deleteRessource(pathIndex, tree, root) {
                this.dispatchDeleteRessources({tree, root});
                this.path.splice(pathIndex + 1);
            }
        }
    }
</script>