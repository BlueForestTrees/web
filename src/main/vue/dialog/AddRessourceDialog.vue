<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle utilisation de ressource'"
                 @esc="close" @enter="validate" @focus="focus">
        <v-card-text>
            <destination :tree="tree"/>

            <v-select
                    label="Nom..."
                    autocomplete chips required cache-items
                    :loading="loading"
                    :items="autocompleteItems"
                    :search-input.sync="itemNamepart"
                    v-model="selectedItemId"
                    item-text="trunk.name" item-value="_id"
                    :rules="[required, notIn]"
            />

            <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>

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
                selection: [],
                autocompleteItems: [],
                itemNamepart: null,
                loading: false,
                selectedItemId: null,
                qt: null,
                unit: null,
            }
        },
        components: {UnitSelect, Destination, Lookup, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            grandeur: function () {
                return this.selectedItem && getGrandeur(this.selectedItem.grandeur);
            },
            selectedItem: function () {
                return this.selectedItemId && find(this.autocompleteItems, {_id: this.selectedItemId});
            }
        },
        methods: {
            ...mapActions({
                dispatchAddLinks: On.ADD_LINKS
            }),
            ...mapActions({
                dispatchSearchTree: On.SEARCH_TREE
            }),
            async searchRessource(term) {
                if (term)
                    this.autocompleteItems = await this.dispatchSearchTree({term});
            },
            validate() {
                this.dispatchAddLinks({
                    tree: this.tree,
                    roots: this.selection
                });
                this.close();
            },
            focus() {

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