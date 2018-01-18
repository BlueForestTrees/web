<template>
    <main-dialog :dialog="Dial.TRUNK" @focus="$refs.nom.focus()" @esc="close" @enter="validate" ref="dialog">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Créer une ressource
                </v-card-title>
                <v-card-text>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <v-icon>bookmark</v-icon>
                                </v-avatar>
                                <v-text-field ref="nom" placeholder="Nom" :value="dialog.data.name" @input="updateName"/>
                            </v-layout>
                        </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="primary" @click="close">Annuler</v-btn>
                    <v-btn flat @click="validate">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
        data() {
            return {
                Dial: Dial
            }
        },
        components: {MainDialog},
        props: ['data'],
        methods: {
            ...mapActions({
                "createAndOpen": On.CREATE_AND_OPEN_TREE
            }),
            validate() {
                this.createAndOpen({name: this.$refs.dialog.data.name});
                this.$refs.dialog.close();
            },
            updateName: async function (value) {
                this.$refs.dialog.data = {name: value};
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>