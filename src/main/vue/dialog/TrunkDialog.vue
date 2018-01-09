<template>
    <main-dialog :dialog="Dial.TRUNK" @focus="$refs.nameInput.focus()" @validate="validate" ref="dialog">
        <template slot-scope="props">
            <v-card-title class="grey lighten-4 py-4 title">
                Créer une ressource
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon>bookmark</v-icon>
                            </v-avatar>
                            <v-text-field ref="nameInput" placeholder="Nom" :value="props.data.name" @input="updateName"/>
                        </v-layout>
                    </v-flex>
                    <v-flex v-if="existingTrunk" xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon color="red">warning</v-icon>
                            </v-avatar>
                            Ce nom est déjà utilisé. <v-btn @click="open(existingTrunk)">Ouvrir</v-btn>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {On} from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
        data() {
            return {
                Dial: Dial,
                existingTrunk:null
            }
        },
        components: {MainDialog},
        props: ['data'],
        methods: {
            ...mapActions({"validate": On.CREATE_AND_OPEN_TREE, "lookup":On.LOOKUP_TRUNK, "openTree":On.OPEN_TREE}),
            updateName:async function(value) {
                this.$refs.dialog.data = {name:value};
                this.existingTrunk = await this.lookup(value);
            },
            open(tree){
                this.$refs.dialog.close();
                this.openTree(tree);
            }
        }
    }
</script>