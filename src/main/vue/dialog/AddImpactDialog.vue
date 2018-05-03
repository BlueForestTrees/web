<template>
    <main-dialog :dialog="Dial.IMPACT" :title="'Nouvel impact'" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-card-text v-if="tree">
            <destination :tree="tree"/>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-select
                        label="Nom..." ref="nom"
                        autocomplete required cache-items
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
    </main-dialog>
</template>

<script>
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import MainDialog from "./MainDialog";
    import UnitGrid from "../common/UnitGrid";
    import {getGrandeur} from "trees-units";
    import closable from "../mixin/Closable";
    import {isNumber, required} from "../../services/rules";
    import {find} from 'lodash';
    import Destination from "../common/Destination";
    import UnitSelect from "../common/UnitSelect";

    export default {
        name: 'add-impact-dialog',
        mixins: [closable],
        components: {
            UnitSelect,
            Destination,
            UnitGrid,
            MainDialog
        },
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
        computed: {
            ...mapState({tree: state => state.dialogs[Dial.IMPACT].data.tree}),
            grandeur: function () {
                return this.selectedItem && getGrandeur(this.selectedItem && this.selectedItem.grandeur);
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
            ...mapActions({dispatchSearch: On.SEARCH_IMPACT_ENTRY, dispatchAddImpact: On.ADD_IMPACT}),
            async search(term) {
                if (term)
                    this.autocompleteItems = await this.dispatchSearch({term});
            },
            async validate() {
                this.$refs.form.validate();
                if (this.valid) {
                    await this.dispatchAddImpact({
                        tree: this.tree,
                        impact: {
                            _id: this.selectedItemId, name: this.selectedItem.name,
                            quantity: {qt: this.qt, unit: this.unit.shortname}
                        }
                    });
                    this.close();
                }
            },
            focus() {
                this.$refs.form.reset();
                this.autocompleteItems = [];
                this.$nextTick(() => this.$refs.nom.focus());
            },
            required, isNumber, notIn() {
                return !find(this.tree.impacts.items, {_id: this.selectedItemId}) || "Déjà utilisé";
            }
        }
    }
</script>