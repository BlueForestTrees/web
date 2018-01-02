<template>
    <v-dialog v-model="visible" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title" >
                Ajouter une caractéristique
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon>assignment</v-icon>
                            </v-avatar>
                            <v-text-field ref="qtUnitNameInput" placeholder="Quantité Unité Nom (ex.: 10l eau)"
                                          @input="changeQtUnitName"/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="hide">Annuler</v-btn>
                <v-btn flat @click="validate">Créer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex';
    import {Do, On} from "../../store/keys";

    export default {
        name:'facet-dialog',
        props: ['data','tree'],
        methods: {
            ...mapActions({"addFacet": On.ADD_FACET}),
            ...mapMutations({
                "hide": Do.HIDE_FACET_DIALOG,
                "setVisible":Do.UPDATE_FACET_DIALOG_VISIBILITY,
                "update":Do.UPDATE_FACET_DIALOG_DATA
            }),
            ...mapGetters(['qtUnitName']),
            validate: function () {
                this.addFacet({tree:this.tree, facet:this.data.data});
                this.hide();
            },
            changeQtUnitName: function (value) {
                this.update(this.$store.getters.qtUnitName(value));
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
                    this.$nextTick(this.$refs.qtUnitNameInput.focus);
                }
            }
        }
    }
</script>