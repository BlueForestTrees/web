<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Nouvelle ressource'"
                 @esc="close" @enter="validateForm"
                 :noaction="searching">
        <v-card-text>
            <destination :tree="tree"/>


                <span v-if="searching">
                    <search-trunk>
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
                panels: []
            }
        },
        components: {SearchTrunk, SearchCat, SearchComp, GrandeurSelect, UnitSelect, Destination, MainDialog},
        computed: {
            ...mapState({tree: state => state.dialogs.addRessource.data.tree}),
            searching: function () {
                return this.searchAgain || !this.selectedItem
            }
        },
        methods: {
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
                dispatchCreateBranch: On.CREATE_ROOT,
                dispatchRefreshRessources: On.LOAD_ROOTS,
                snack: On.SNACKBAR,
                addToBasket: On.ADD_TO_BASKET
            }),
            async validateForm() {
                const bqt = baseQt({qt: this.qt, unit: this.unit.shortname}) / this.tree.trunk.quantity.bqt
                await this.dispatchCreateBranch({
                    _id: createStringObjectId(),
                    trunkId: this.tree._id,
                    rootId: this.selectedItem._id,
                    bqt
                })
                this.addToBasket([this.tree, this.selectedItem])
                this.dispatchRefreshRessources(this.tree)
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