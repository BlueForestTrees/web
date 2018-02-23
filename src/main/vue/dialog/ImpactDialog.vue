<template>
    <main-dialog :dialog="Dial.IMPACT" @focus="focus" @esc="close" @entre="validate" ref="dialog">
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
                                <v-chip v-for="impactEntry in impactEntries" :key="impactEntry._id"
                                        @click="selectedImpactEntry = impactEntry"
                                        fab dark small color="primary" text-color="white">
                                    {{impactEntry.name}}
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

                        <v-layout row v-if="selectedImpactEntry">
                            <v-flex xs4>
                                <v-subheader>Sélectionnez une unité:</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <unit-grid :grandeur="selectedImpactEntry.grandeur" @select="unit=$event"/>
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
                impactEntries: null,
                selectedImpactEntry: null,
                qt: null,
                unit: null
            }
        },
        props: ['tree'],
        computed: {
            ...mapState(['grandeurs'])
        },
        methods: {
            ...mapActions({dispatchSearchImpactEntry: On.SEARCH_IMPACT_ENTRY, dispatchAddImpact: On.ADD_IMPACT}),
            async namepartChange() {
                this.impactEntries = await this.dispatchSearchImpactEntry({namepart: this.namepart});
            },
            validate() {
                const impact = {
                    _id: this.selectedImpactEntry._id,
                    name: this.selectedImpactEntry.name,
                    quantity: {
                        qt: parseFloat(this.qt.replace(',', '.')),
                        unit: this.unit.shortname
                    }
                };

                this.dispatchAddImpact({tree: this.tree, impact});
                this.close();
            },
            focus() {
                this.$refs.nom.focus();
                this.namepart = null;
                this.qt = null;
                this.unit = null;
                this.selectedImpactEntry = null;
            },
            close() {
                this.$refs.dialog.close();
            }
        }
    }
</script>