<template>
    <main-dialog :dialog="Dial.TRUNK" @focus="$refs.nom.focus()" :title="'Créer une ressource'" @esc="close" @enter="validate" ref="dialog">
        <template slot-scope="dialog">
            <v-card-text>
                <v-flex xs12 align-center justify-space-between>
                    <v-layout align-center>
                        <v-avatar size="40px" class="mr-3">
                            <v-icon>bookmark</v-icon>
                        </v-avatar>
                        <v-form v-model="valid" class="decoValidation">
                            <v-text-field ref="nom" placeholder="Nom"
                                          :rules="[longueurValidation]" :value="dialog.data.name"
                                          @input="updateName"/>
                        </v-form>
                    </v-layout>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="close">Annuler</v-btn>
                <v-btn :disabled="!valid" flat @click="validate">Ok</v-btn>
            </v-card-actions>
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
                Dial: Dial,
                valid: false
            }
        },
        components: {MainDialog},
        props: ['data'],
        methods: {
            ...mapActions({
                createAndOpen: On.CREATE_AND_OPEN_TREE
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
            },

            longueurValidation: value => (value && value.trim().length > 1) || "2 caractères minimum",
        }
    }
</script>