<template>
    <main-dialog :dialog="Dial.FACET" ref="dialog" :title="'Nouvelle propriété'" @esc="close" @enter="validate" @focus="focus">
        <template slot-scope="props">
            <v-card-text>

                <v-select
                        label="Destination..." required disabled
                        item-text="qtUnitName" item-value="qtUnitName"
                        v-model="treeItem[0]"
                        :items="treeItem"
                ></v-select>

                <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                    <v-select
                            label="Nom..."
                            autocomplete chips required cache-items
                            :loading="loading"
                            :items="autocompleteItems"
                            :search-input.sync="itemNamepart"
                            v-model="selectedItemId"
                            item-text="name" item-value="_id"
                            :rules="[required, notIn]"
                    ></v-select>
                    <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                </v-form>

            </v-card-text>
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
    import {qtUnitName} from "../../services/calculations";

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
            treeItem: function () {
                return [{qtUnitName: qtUnitName(this.tree.trunk)}];
            }
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
            focus: function () {
                this.$refs.form.reset();
                this.autocompleteItems = [];

            },
            async searchFacetEntry(namepart) {
                if (namepart)
                    this.autocompleteItems = await this.dispatchSearchFacetEntry({namepart});
            },
            validate() {
                this.$refs.form.validate();
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
            required, isNumber,
            notIn() {
                return !find(this.tree.facets.items, {_id: this.selectedItemId}) || "Déjà utilisé";
            }
        }
    }
</script>