<template>
    <main-dialog :dialog="Dial.ADD_USAGE" :title="'Nouvel usage'" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text v-if="tree">
            <destination :tree="tree"/>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-autocomplete
                        label="Nom..."
                        required cache-items
                        :loading="loading"
                        :items="autocompleteItems"
                        :search-input.sync="itemNamepart"
                        v-model="selectedItemId"
                        item-text="trunk.name" item-value="_id"
                        :rules="[required, notIn]"
                ></v-autocomplete>
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
    import Destination from "../common/Destination";
    import {isNumber, required} from "../../services/rules";
    import closable from "../mixin/Closable";
    import UnitSelect from "../common/UnitSelect";
    import {getGrandeur} from "trees-units";
    import {find} from 'lodash';

    export default {
        name: 'add-usage-dialog',
        mixins: [closable],
        data() {
            return {
                Dial,

                itemNamepart: null,
                autocompleteItems: [],
                loading: false,
                selectedItemId: null,

                qt: null,
                unit: null,

                valid: false
            }
        },
        components: {UnitSelect, Destination, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs[Dial.ADD_USAGE].data.tree}),
            grandeur: function () {
                return this.selectedItem && getGrandeur(this.selectedItem && this.selectedItem.trunk.grandeur);
            },
            selectedItem: function () {
                return this.selectedItemId && find(this.autocompleteItems, {_id: this.selectedItemId});
            }
        },
        watch: {
            itemNamepart(val) {
                this.loading = true;
                this.search(val);
                this.loading = false;
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                dispatchLink: On.LINK
            }),
            async validate() {
                this.$refs.form.validate();
                if (this.valid) {
                    await this.dispatchLink({
                        trunk: {_id: this.selectedItemId, quantity: {qt: this.qt, unit: this.unit.shortname}},
                        root: {_id: this.tree._id, quantity: this.tree.trunk.quantity}
                    });
                    this.close();
                }
            },
            focus() {

            },
            async search(term) {
                if (term)
                    this.autocompleteItems = await this.dispatchSearch({term});
            },
            required, isNumber, notIn() {
                return !find(this.tree.branches.items, {_id: this.selectedItemId}) || "Déjà utilisé";
            }
        }
    }
</script>