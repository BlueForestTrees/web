<template>
    <main-dialog :dialog="Dial.FACET_ENTITY" ref="dialog"
                 @focus="$refs.nom.focus()" @validate="validate" @esc="close" @enter="validate">
        <template slot-scope="props">

            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Créer une caractéristique
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>Comment cela s'appelle-t-il?</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field label="Nom" ref="nom" v-model="name"/>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>C'est un(e): {{grandeur}}</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-chip v-for="(units,key) in grandeurs" :key="key" @click="grandeur = key"
                                        fab dark small color="primary" text-color="white">
                                    {{key}}
                                </v-chip>
                            </v-flex>
                        </v-layout>

                    </v-container>
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
    import {On} from "../../const/on";
    import {mapActions, mapGetters, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import GrandeurGrid from "../common/GrandeurGrid";

    export default {
        data() {
            return {
                Dial: Dial,
                valid: false,
                name: null,
                grandeur: null
            }
        },
        components: {
            GrandeurGrid,
            MainDialog
        },
        props: ['data'],
        computed: {
            ...mapState({'grandeurs': 'grandeurs'})
        },
        methods: {
            selectGrandeur(grandeur) {
                this.grandeur = grandeur;
            },
            ...mapGetters(['qtUnitName']),
            ...mapActions({"createFacetEntry": On.CREATE_FACET_ENTRY}),
            validate: function () {
                this.createFacetEntry({name: this.name, grandeur: this.grandeur});
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>