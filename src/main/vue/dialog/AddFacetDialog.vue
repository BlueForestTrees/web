<template>
    <main-dialog :dialog="Dial.FACET" ref="dialog" :title="'Nouvelle propriété'" :icon="'add'"
                 @esc="close" @enter="validate" @focus="clear">
        <template slot-scope="props">
            <v-card>
                <v-card-text>
                    <v-container fluid>

                        <v-form v-model="valid" v-on:submit.prevent="">
                            <v-select
                                    label="Nom..."
                                    autocomplete chips required cache-items
                                    :loading="loading"
                                    :items="autocompleteItems"
                                    :search-input.sync="itemNamepart"
                                    v-model="selectedItemId"
                                    item-text="name" item-value="_id"
                            ></v-select>
                            <v-text-field label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                            <unit-select v-model="unit" :grandeur="grandeur"/>
                        </v-form>

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
    import {mapActions} from "vuex";
    import MainDialog from "./MainDialog";
    import UnitGrid from "../common/UnitGrid";
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";

    import {getGrandeur} from 'trees-units'
    import {isNumber, required} from "../../services/rules";
    import {find} from 'lodash';

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

                itemNamepart: null,
                autocompleteItems: [],
                loading: false,
                selectedItemId: null,

                qt: null,
                unit: null,

                valid: false
            }
        },
        props: ['tree'],
        computed: {
            grandeur: function () {
                return this.selectedItem && getGrandeur(this.selectedItem && this.selectedItem.grandeur);
            },
            selectedItem: function () {
                return this.selectedItemId && find(this.autocompleteItems, {_id: this.selectedItemId});
            },
        },
        watch: {
            itemNamepart(val) {
                this.loading = true;
                this.searchFacetEntry(val);
                this.loading = false;
            }
        },
        methods: {
            ...mapActions({dispatchSearchFacetEntry: On.SEARCH_FACET_ENTRY, dispatchAddFacet: On.ADD_FACET}),
            clear: function () {
                this.unit = this.qt = this.selectedItemId = this.itemNamepart = null;
                this.autocompleteItems = [];
            },
            async searchFacetEntry(namepart) {
                if (namepart)
                    this.autocompleteItems = await this.dispatchSearchFacetEntry({namepart});
            },
            validate() {
                if (this.valid) {
                    const facet = {
                        _id: this.selectedItem._id,
                        name: this.selectedItem.name,
                        quantity: {
                            qt: parseFloat(this.qt.replace(',', '.')),
                            unit: this.unit.shortname
                        }
                    };

                    this.dispatchAddFacet({tree: this.tree, facet});
                    this.close();
                }
            },
            close() {
                this.$refs.dialog.close();
            },
            required, isNumber
        }
    }
</script>