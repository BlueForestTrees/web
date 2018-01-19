<template>
    <v-card>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>


        <span class="air">
            <template v-for="(trunk,pathIndex) in path">
                    <v-layout :key="trunk._id" row wrap justify-center align-center>
                        <v-chip v-for="root in trunk.roots" :key="root._id"
                                outline color="primary" fab dark small
                                @click="select(pathIndex,root)"
                                :close="root.selected" @input="deleteRessource(trunk, root)"
                        >
                            <v-icon left v-if="root.selected" @click="">build</v-icon>

                            {{root.name}}
                        </v-chip>
                        <v-chip :key="'addRessourceChip'"
                                outline color="primary" fab dark small
                                @click="addRessourceTo(path[pathIndex])"
                        >
                            <v-icon right>
                                add
                            </v-icon>
                        </v-chip>
                    </v-layout>
            </template>
        </span>


    </v-card>


</template>

<script>
    import On from "../../const/on";
    import {mapActions} from 'vuex';

    export default {
        props: ['tree'],
        data() {
            return {
                path: [this.tree],
                selectedRoot: null
            }
        },
        methods: {
            ...mapActions({dispatchDeleteRessources: On.DELETE_RESSOURCES}),
            updateSelectedRoot(root){
                if(this.selectedRoot){
                    this.selectedRoot.selected = false;
                }
                this.selectedRoot = root;
                this.selectedRoot.selected = true;
            },
            select(pathIndex, root) {
                this.path.splice(pathIndex + 1);
                this.path.push(root);
                this.updateSelectedRoot(root);
            },
            addRessourceTo (ressource){
                console.log("add to ", ressource);
            },
            deleteRessource(tree, ressource){
                console.log("delete", tree, ressource);
                this.dispatchDeleteRessources({tree, ressources:[ressource]});
            }
        }
    }
</script>