<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'"
                 @esc="close" @enter="validate" @focus="focus"
                 :noaction="noaction">
        <v-card-text>
            <destination :tree="tree"/>

            <v-form v-model="valid" v-on:submit.prevent="" ref="form">

                <search-comp :maxSelectionSize="1">
                    <template slot-scope="{ s }">
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.selecteds" flat dense @click="select(s.selection);s.unselect()">
                                <v-icon>done</v-icon>
                                Valider
                            </v-btn>
                            <span style="pointer-events: none">Valider</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <span slot="activator"><v-btn icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn></span>
                            <span style="pointer-events: none">Fermer</span>
                        </v-tooltip>
                    </template>
                </search-comp>

                <span v-if="!noaction">
                    <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                </span>
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
    import {grandeur, getGrandeur, unit} from 'trees-units'
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
                valid: false
            }
        },
        components: {SearchComp, GrandeurSelect, UnitSelect, Destination, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree})
        },
        methods: {
            ...mapActions({
                dispatchLink: On.LINK,
                dispatchRefreshRessources: On.LOAD_ROOTS
            }),
            select: function (selection) {
                this.selectedItem = selection[0];
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
            },
            required, isNumber,
            notIn() {
                return this.selectedItem && this.tree && !find(this.tree.roots.items, {_id: this.selectedItem._id}) || "Déjà utilisé";
            },
        },
        mounted: function () {
            console.log("add ressource mounted");
        },
        watch: {
            selectedItem(item) {
                if (item) {
                    if (!item.trunk.quantity) {
                        throw new Error("la ressource utilisée n'a pas de quantité")
                    }
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