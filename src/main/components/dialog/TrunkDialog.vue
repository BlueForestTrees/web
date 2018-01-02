<template>
    <v-dialog v-model="visible" width="800px">
        <v-card>
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
                            <v-text-field ref="nameInput" placeholder="Nom" :value="data.data.name"
                                          @input="changeName"/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="closeDialog">Annuler</v-btn>
                <v-btn flat @click="validate">Créer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import {Do, On} from "../../store/keys";

    export default {
        name: 'create-dialog',
        props: ['data'],
        methods: {
            ...mapActions({"createAndOpen": On.CREATE_AND_OPEN_TREE}),
            ...mapMutations({"closeDialog": Do.HIDE_TRUNK_DIALOG, "setVisible":Do.UPDATE_TRUNK_DIALOG_VISIBILITY}),
            ...mapMutations([Do.UPDATE_TRUNK_DIALOG_DATA]),
            validate: function () {
                this.createAndOpen(this.data.data.name);
                this.closeDialog();
            },
            changeName: function (value) {
                this.updateTrunkDialogData({name:value});
            }
        },
        computed: {
            visible: {
                get: function () {
                    return this.data.visible;
                },
                set: function(value){
                    this.setVisible(value);
                }
            }
        },
        watch: {
            visible(visible) {
                if (visible) {
                    this.$nextTick(this.$refs.nameInput.focus);
                }
            }
        }
    }
</script>