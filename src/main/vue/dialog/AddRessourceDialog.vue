<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle utilisation de ressource'"
                 @esc="close" @enter="validate" @focus="focus">
        <v-card-text>
            <destination :tree="tree"/>

            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-select
                        label="Nom..." ref="nom"
                        autocomplete required cache-items
                        :loading="loading"
                        :items="autocompleteItems"
                        :search-input.sync="itemNamepart"
                        v-model="selectedItemId"
                        item-text="trunk.name" item-value="_id"
                        :rules="[required, notIn]"
                        taggable
                />

                <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";
    import Destination from "../common/Destination";
    import {find} from 'lodash';
    import {isNumber, required} from "../../services/rules";
    import {getGrandeur} from 'trees-units'
    import UnitSelect from "../common/UnitSelect";
    import closable from "../mixin/Closable";

    export default {
        name: 'add-ressource-dialog',
        mixins: [closable],
        data() {
            return {
                Dial: Dial,
                autocompleteItems: [],
                itemNamepart: null,
                loading: false,
                selectedItemId: null,
                qt: null,
                unit: null,
                valid: false
            }
        },
        components: {UnitSelect, Destination, Lookup, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            grandeur: function () {
                return this.selectedItem && getGrandeur(this.selectedItem.trunk.grandeur);
            },
            selectedItem: function () {
                return this.selectedItemId && find(this.autocompleteItems, {_id: this.selectedItemId});
            }
        },
        methods: {
            ...mapActions({
                dispatchLink: On.LINK
            }),
            ...mapActions({
                dispatchSearchTree: On.SEARCH_TREE
            }),
            async searchRessource(term) {
                if (term)
                    this.autocompleteItems = await this.dispatchSearchTree({term});
            },
            async validate() {
                await this.dispatchLink({
                    trunk: {_id: this.tree._id, quantity: this.tree.trunk.quantity},
                    root: {_id: this.selectedItemId, quantity: {qt: this.qt, unit: this.unit.shortname}}
                });
                this.close();
            },
            focus() {
                this.$refs.form.reset();
                this.autocompleteItems = [];
                this.$nextTick(() => this.$refs.nom.focus());
            },
            required, isNumber,
            notIn() {
                return this.tree && !find(this.tree.roots.items, {_id: this.selectedItemId}) || "Déjà utilisé";
            }
        },
        watch: {
            itemNamepart(val) {
                this.loading = true;
                val && this.searchRessource(val);
                this.loading = false;
            }
        }
    }
</script>