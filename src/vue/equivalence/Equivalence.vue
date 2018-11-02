<template>
    <v-flex key="equiv">
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Equivalence</span>
        </v-layout>

        <v-layout column>
            <v-layout row wrap justify-center align-center class="ma-4">
                <v-card class="pl-2 pr-3 py-2 ma-1" style="border-radius:2em">
                    <v-container>
                        <v-layout row align-center v-if="filter">
                            <v-flex class="display-1">Produits avec: {{qtUnitName(filter)}}</v-flex>
                        </v-layout>
                        <tree-head :photo="false" :tree="tree" v-if="tree"/>
                        <loader v-else/>
                        <selectable-list :items="equivalences" :exceptId="_id">
                            <template slot="bar" slot-scope="{ s }">
                                <v-toolbar-items>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" v-if="s.selectionCount" flat dense
                                               @click="addToBasket(s.selection);s.unselect()">Panier
                                            <v-icon>arrow_right_alt</v-icon>
                                            <v-icon>shopping_basket</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Ajouter au panier</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree({_id:s.oneSelected._id, trunk:s.oneSelected})">ouvrir
                                            <v-icon>category</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Ouvrir</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="compare(s.twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                                        <span style="pointer-events: none">Comparer</span>
                                    </v-tooltip>
                                </v-toolbar-items>
                                <v-spacer/>
                                <v-toolbar-items>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" icon dense @click="s.unselect()">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Fermer</span>
                                    </v-tooltip>
                                </v-toolbar-items>
                            </template>
                            <span slot="no-items"/>
                        </selectable-list>

                        <loader v-if="loading"/>
                        <v-btn v-else flat @click="updateEquivalences" block>Plus</v-btn>

                    </v-container>
                </v-card>
            </v-layout>
        </v-layout>
    </v-flex>
</template>
<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"
    import TreeHead from "../tree/TreeHead"
    import {find, map} from "unit-manip"
    import SelectableList from "../common/SelectableList"
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: "equivalence",
        components: {SelectableList, TreeHead, Loader},
        data() {
            return {
                tree: null,
                type: null,
                filter: null,
                loading: false,
                equivalences: []
            }
        },
        props: ['_id', 'bqt', 'sbqt', 's_id'],
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        methods: {
            qtUnitName,
            ...mapActions({
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSearchEquiv: On.SEARCH_EQUIV,
                snack: On.SNACKBAR,
                goTree: On.GO_TREE,
                compare: On.GO_COMPARE,
                dispatchAddToBasket: On.ADD_TO_BASKET,
                showDialog: On.SHOW_DIALOG
            }),
            addToBasket: function (selection) {
                this.dispatchAddToBasket(map(selection, e => ({_id: e._id, trunk: e})))
            },
            refresh: async function () {
                try {
                    this.tree = await this.dispatchLoad({bqt: this.bqt, _id: this._id})
                    await this.tree.promises.facets
                    await this.tree.promises.impactsTank
                    this.updateFilter()
                    this.updateEquivalences()
                } catch (e) {
                    this.snack({text: "Cet élement n'existe pas ou plus", color: "orange"})
                }
            },
            updateFilter() {
                let attribut = this.tree && this.tree.facets && find(this.tree.facets, "_id", this.s_id)
                if (attribut) {
                    this.type = "facet"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.impactsTank && find(this.tree.impactsTank, "_id", this.s_id)
                if (attribut) {
                    this.type = "impact"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.roots && find(this.tree.roots, "_id", this.s_id)
                if (attribut) {
                    this.type = "root"
                    this.filter = attribut
                    return
                }
                console.warn("update filter but no equiv attribute")
            },
            async updateEquivalences() {
                if (this.filter) {
                    this.loading = true
                    await this.dispatchSearchEquiv({results: this.equivalences, type: this.type, bqt: this.sbqt, _id: this.filter[(this.type === "root" ? "_id" : `${this.type}Id`)]})
                    this.loading = false
                }
            }
        },
        created: function () {
            this.refresh()
        },
    }
</script>