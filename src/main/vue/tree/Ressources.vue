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
                                @click="select(pathIndex,root)" @blur="unselect(root)" @input="deleteRessource(pathIndex, trunk, root)"
                                :close="root.selected"
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
                path: [this.tree]
            }
        },
        methods: {
            ...mapActions({dispatchDeleteRessources: On.DELETE_ROOT}),
            select(pathIndex, root) {
                this.path.splice(pathIndex + 1);
                this.path.push(root);
                root.selected = true;
            },
            unselect(root){
                root.selected = false;
            },
            addRessourceTo (ressource){
                console.log("add to ", ressource);
            },
            deleteRessource(pathIndex, tree, root){
                this.dispatchDeleteRessources({tree, root});
                this.path.splice(pathIndex+1);
            }
        }
    }
</script>