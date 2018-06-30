<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'"
                 @esc="close" @enter="validate" @focus="focus">
        <v-card-text>
            <destination :tree="tree"/>

            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-autocomplete
                        label="Nom..." ref="nom"
                        required cache-items
                        :loading="loading"
                        :items="autocompleteItems"
                        :search-input.sync="itemNamepart"
                        v-model="selectedItem"
                        item-text="trunk.name" item-value="_id"
                        :rules="[required, notIn]"
                        return-object
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
    import GrandeurSelect from "../common/GrandeurSelect";

    export default {
        name: 'add-ressource-dialog',
        mixins: [closable],
        data() {
            return {
                Dial: Dial,
                autocompleteItems: [],
                itemNamepart: null,
                loading: false,
                selectedItem: null,
                qt: null,
                unit: null,
                valid: false
            }
        },
        components: {GrandeurSelect, UnitSelect, Destination, Lookup, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            grandeur: {
                get: function () {
                    return this.selectedItem && this.selectedItem.trunk && getGrandeur(this.selectedItem.trunk.grandeur);
                },
                set: function (v) {
                    // this.selectedItem.trunk.grandeur = v;
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchSearchTree: On.SEARCH_TREE,
                dispatchLink: On.LINK,
                dispatchRefreshRessources: On.LOAD_ROOTS
            }),
            async searchRessource(term) {
                if (term)
                    this.autocompleteItems = await this.dispatchSearchTree({term});
            },
            async validate() {
                await this.dispatchLink({
                    trunk: {_id: this.tree._id, quantity: this.tree.trunk.quantity},
                    root: {_id: this.selectedItem._id, quantity: {qt: this.qt, unit: this.unit.shortname}}
                });
                this.dispatchRefreshRessources(this.tree);
                this.close();
            },
            focus() {
                this.$refs.form.reset();
                this.autocompleteItems = [];
                this.$nextTick(() => this.$refs.nom.focus());
            },
            required, isNumber,
            notIn() {
                return this.selectedItem && this.tree && !find(this.tree.roots.items, {_id: this.selectedItem._id}) || "Déjà utilisé";
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