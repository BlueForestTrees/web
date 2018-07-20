<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'"
                 @esc="close" @enter="validateForm" @focus="focus"
                 :noaction="searching">
        <v-card-text>
            <destination :tree="tree"/>

            <v-form v-model="validForm" v-on:submit.prevent="" ref="form">

                <search-comp v-if="searching" maxSelectionSize="1">
                    <template slot-scope="{ s }">
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="validateSearch(s)">
                                <v-icon>done</v-icon>
                                Valider
                            </v-btn>
                            <span style="pointer-events: none">Valider</span>
                        </v-tooltip>
                        <v-spacer/>
                        <v-tooltip bottom>
                            <span slot="activator"><v-btn icon dense @click="closeSearch(s)"><v-icon>close</v-icon></v-btn></span>
                            <span style="pointer-events: none">Fermer</span>
                        </v-tooltip>
                    </template>
                </search-comp>

                <v-card v-else>
                    <v-card-title>
                        <v-icon large :style="{color: selectedItem.trunk.color,marginRight:'0.2em'}">lens</v-icon>
                        {{selectedItem.trunk.name}}
                        <v-spacer/>
                        <v-btn icon @click="cancelItem">
                            <v-icon color="grey darken-2">delete</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                        <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                    </v-card-text>
                </v-card>

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
    import {find} from 'lodash';
    import {isNumber, required} from "../../services/rules";
    import {getGrandeur, unit} from 'trees-units'
    import UnitSelect from "../common/UnitSelect";
    import closable from "../mixin/Closable";
    import GrandeurSelect from "../common/GrandeurSelect";
    import SearchComp from "../SearchComp";

    export default {
        name: 'add-ressource-dialog',
        mixins: [closable],
        data() {
            return {
                noaction: true,
                Dial: Dial,
                selectedItem: null,
                qt: null,
                unit: null,
                grandeur: null,
                searchAgain: false,
                validForm: false,
            }
        },
        components: {SearchComp, GrandeurSelect, UnitSelect, Destination, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            searching: function () {
                return this.searchAgain || !this.selectedItem;
            }
        },
        methods: {
            validateSearch: function (s) {
                const item = s.selection[0];
                if (!item.trunk.quantity) {
                    this.snack({text: "Ressource inutilisable pour le moment (elle ne possède pas de quantité)"});
                } else {
                    this.selectedItem = item;
                    this.searchAgain = false;
                    s.unselect();
                }
            },
            closeSearch: function (s) {
                s.unselect();
            },
            cancelItem: function () {
                this.selectedItem = null;
            },
            ...mapActions({
                dispatchLink: On.LINK,
                dispatchRefreshRessources: On.LOAD_ROOTS,
                snack: On.SNACKBAR
            }),
            async validateForm() {
                await this.dispatchLink({
                    trunk: {_id: this.tree._id, quantity: this.tree.trunk.quantity},
                    root: {_id: this.selectedItem._id, quantity: {qt: this.qt, unit: this.unit.shortname}}
                });
                this.dispatchRefreshRessources(this.tree);
                this.close();
            },
            focus() {
                this.$refs.form.reset();
                this.selectedItem = null;
            },
            required, isNumber,
            notIn() {
                return this.selectedItem && this.tree && !find(this.tree.roots.items, {_id: this.selectedItem._id}) || "Déjà utilisé";
            },
        },
        watch: {
            selectedItem(item) {
                if (item) {
                    this.qt = item.trunk.quantity.qt;
                    this.unit = unit(item.trunk.quantity.unit);
                    this.grandeur = getGrandeur(this.unit.grandeur);
                } else {
                    this.qt = null;
                    this.unit = null;
                    this.grandeur = null;
                }
            }
        }
    }
</script>