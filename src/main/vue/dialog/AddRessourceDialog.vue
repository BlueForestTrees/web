<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'" @esc="close"
                 @enter="validateForm" :noaction="searching">
        <v-card-text>
            <v-layout row align-center justify-center v-if="!isOwner">
                <v-icon color="orange">info</v-icon>
                Cet élément n'est pas à vous!
            </v-layout>
            <destination :tree="tree"/>

            <span v-if="searching">
                    <v-container>
                        <v-layout row wrap justify-center>
                            <v-card class="ma-1"
                                    :style="{borderRadius: '1.5em',background: searchingSearch ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                                <v-container py-2 pr-3 pl-2 @click="selectSearch" style="cursor: pointer">
                                    <v-layout row align-center style="pointer-events: none">
                                        <v-icon v-if="searchingSearch" color="primary" mr-1>search</v-icon>
                                        <v-icon v-else>search</v-icon>
                                        Recherche
                                    </v-layout>
                                </v-container>
                            </v-card>
                            <v-card class="ma-1"
                                    :style="{borderRadius: '1.5em',background: searchingBasket ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                                <v-container py-2 pr-3 pl-2 @click="selectBasket" style="cursor: pointer">
                                    <v-layout row align-center style="pointer-events: none">
                                        <v-icon v-if="searchingBasket" color="primary" mr-1>shopping_basket</v-icon>
                                        <v-icon v-else>shopping_basket</v-icon>
                                        Panier
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-layout>
                    </v-container>
                    <search-trunk v-if="searchingSearch">
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
                    </search-trunk>
                    <basket-comp v-if="searchingBasket" max-selection-size="1">
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
                    </basket-comp>
                </span>
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
                    <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt"
                                  :rules="[required, isNumber]"/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                </v-card-text>
            </v-card>

        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog"
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import Destination from "../common/Destination"
    import {isNumber, required} from "../../services/rules"
    import {getGrandeur, unit} from 'unit-manip'
    import UnitSelect from "../common/UnitSelect"
    import closable from "../mixin/Closable"
    import GrandeurSelect from "../common/GrandeurSelect"
    import SearchComp from "../SearchComp"
    import {createStringObjectId} from "../../services/calculations"
    import {bqtGToQtUnit, baseQt} from "unit-manip"
    import SearchCat from "../SearchCat"
    import SearchTrunk from "../SearchTrunk"
    import BasketComp from "../BasketComp"

    export default {
        name: 'add-ressource-dialog',
        mixins: [closable],
        data() {
            return {
                Dial: Dial,
                selectedItem: null,
                qt: null,
                unit: null,
                grandeur: null,
                searchAgain: false,
                panels: [],
                searchingSearch: false,
                searchingBasket: false
            }
        },
        components: {
            BasketComp,
            SearchTrunk,
            SearchCat,
            SearchComp,
            GrandeurSelect,
            UnitSelect,
            Destination,
            MainDialog
        },
        computed: {
            ...mapState({user: s => s.user, tree: s => s.dialogs.addRessource.data.tree}),
            searching: function () {
                return this.searchAgain || !this.selectedItem
            },
            isOwner: function () {
                return this.user && this.tree && this.tree.owner && this.tree.owner._id && this.tree.owner._id === this.user._id
            }
        },
        methods: {
            selectSearch() {
                this.searchingSearch = true
                this.searchingBasket = false
            },
            selectBasket() {
                this.searchingSearch = false
                this.searchingBasket = true
            },
            validateSearch: function (s) {
                const item = s.selection[0]
                if (!item.trunk.quantity) {
                    this.snack({text: "Ressource inutilisable pour le moment (elle ne possède pas de quantité)"})
                } else {
                    this.selectedItem = item
                    this.searchAgain = false
                    s.unselect()
                }
            },
            closeSearch: function (s) {
                s.unselect()
            },
            cancelItem: function () {
                this.selectedItem = null
            },
            ...mapActions({
                dispatchCreateRoot: On.CREATE_ROOT,
                snack: On.SNACKBAR,
                addToBasket: On.ADD_TO_BASKET
            }),
            async validateForm() {
                const bqt = baseQt({qt: this.qt, unit: this.unit.shortname}) / this.tree.trunk.quantity.bqt
                this.dispatchCreateRoot({
                    _id: createStringObjectId(),
                    trunkId: this.tree._id,
                    rootId: this.selectedItem._id,
                    bqt
                }).then(() => {
                    this.addToBasket([this.tree, this.selectedItem])
                }).catch((err) => {
                    console.log(err)
                    this.snack({text: "Cet élement n'est pas à vous!", color: "orange"})
                })
                this.close()
            },
            required, isNumber,
            notIn() {
                if (this.selectedItem && this.tree) {
                    for (let i = 0; i < this.tree.roots; i++) {
                        if (this.tree.roots[i]._id === this.selectedItem._id) {
                            return "Déjà utilisé"
                        }
                    }
                }
            },
        },
        watch: {
            selectedItem(item) {
                if (item) {
                    let bqtG = item.trunk.quantity
                    const qtUnit = bqtGToQtUnit(bqtG)
                    this.qt = qtUnit.bqt
                    this.unit = unit(qtUnit.unit)
                    this.grandeur = getGrandeur(bqtG.g)
                } else {
                    this.qt = null
                    this.unit = null
                    this.grandeur = null
                }
            }
        }
    }
</script>