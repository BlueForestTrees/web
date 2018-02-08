<template>
    <main-dialog :dialog="Dial.FACET" @focus="focus" @esc="close" @entre="validate" ref="dialog">
        <template slot-scope="props">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Ajouter à {{tree && tree.name}}: {{qt}}{{unit && unit.shortname}}
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>Comment cela s'appelle-t-il?</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field label="Nom" ref="nom" v-model="namepart" @input="namepartChange"/>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>Sélectionnez une caractéristique:</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-chip v-for="facetEntry in facetEntries" :key="facetEntry._id"
                                        @click="selectedFacetEntry = facetEntry"
                                        fab dark small color="primary" text-color="white">
                                    {{facetEntry.name}}
                                </v-chip>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>Entrez une quantité:</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field label="quantité (ex.: 10)" v-model="qt"/>
                            </v-flex>
                        </v-layout>

                        <v-layout row v-if="selectedFacetEntry">
                            <v-flex xs4>
                                <v-subheader>Sélectionnez une unité:</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <unit-grid :grandeur="selectedFacetEntry.grandeur" @select="unit=$event"/>
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
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import MainDialog from "./MainDialog";
    import UnitGrid from "../common/UnitGrid";


    export default {
        components: {
            UnitGrid,
            MainDialog
        },
        data() {
            return {
                Dial: Dial,
                namepart: null,
                facetEntries: null,
                selectedFacetEntry: null,
                qt: null,
                unit: null
            }
        },
        props: ['tree'],
        computed: {
            ...mapState(['grandeurs'])
        },
        methods: {
            ...mapActions({dispatchSearchFacetEntry: On.SEARCH_FACET_ENTRY, dispatchAddFacet: On.ADD_FACET}),
            async namepartChange() {
                this.facetEntries = await this.dispatchSearchFacetEntry({namepart: this.namepart});
            },
            validate() {
                const facet = {
                    _id: this.selectedFacetEntry._id,
                    name: this.selectedFacetEntry.name,
                    qt: parseFloat(this.qt.replace(',','.')),
                    unit: this.unit.shortname
                };

                this.dispatchAddFacet({tree:this.tree, facet});
                this.close();
            },
            focus(){
                this.$refs.nom.focus();
                this.namepart = null;
                this.qt = null;
                this.unit = null;
                this.selectedFacetEntry = null;
            },
            close() {
                this.$refs.dialog.close();
            }
        }
    }
</script>