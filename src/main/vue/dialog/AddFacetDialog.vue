<template>
    <main-dialog :dialog="Dial.FACET" ref="dialog" :title="'Nouvelle propriété'" :icon="'add'"
                 @esc="close" @enter="validate">
        <template slot-scope="props">
            <v-card>
                <v-card-text>
                    <v-container fluid>

                        <v-layout row>

                            <v-select label="Nom de la propriété..." item-text="name" autocomplete required
                                      :items="facetEntries" :search-input.sync="search" :loading="loading"
                                      v-model="select"
                            ></v-select>

                        </v-layout>

                        <v-layout row>
                            <v-text-field label="Quantité... (ex.: 10)" v-model="qt"/>
                        </v-layout>

                        <v-layout row>
                            <grandeur-select v-model="grandeur"/>
                            <unit-select v-model="unit" :grandeur="grandeur"/>
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
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";


    export default {
        name: 'add-facet-dialog',
        components: {
            UnitSelect,
            GrandeurSelect,
            UnitGrid,
            MainDialog
        },
        data() {
            return {
                Dial: Dial,
                namepart: null,
                facetEntries: [],
                qt: null,
                unit: null,

                grandeur: null,

                loading: false,
                search: null,
                select: []
            }
        },
        props: ['tree'],
        computed: {
            ...mapState(['grandeurs'])
        },
        watch: {
            search(val) {
                this.doSearch(val)
            }
        },
        methods: {
            ...mapActions({dispatchSearchFacetEntry: On.SEARCH_FACET_ENTRY, dispatchAddFacet: On.ADD_FACET}),
            async doSearch(namepart) {
                if (!namepart) {
                    this.facetEntries = [];
                }
                this.facetEntries = await this.dispatchSearchFacetEntry({namepart});
            },
            validate() {
                const facet = {
                    _id: this.selectedFacetEntry._id,
                    name: this.selectedFacetEntry.name,
                    quantity: {
                        qt: parseFloat(this.qt.replace(',', '.')),
                        unit: this.unit.shortname
                    }
                };

                this.dispatchAddFacet({tree: this.tree, facet});
                this.close();
            },
            close() {
                this.$refs.dialog.close();
            }
        }
    }
</script>