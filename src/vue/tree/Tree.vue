<template>
    <v-flex key="tree">
        <v-layout v-if="tree" row wrap justify-center align-center class="ma-4">
            <span class="title">Composition{{tree ? ' de:':''}}</span>
            <v-card v-if="tree" class="pl-2 pr-3 py-2 ma-1" style="border-radius:2em">
                <tree-head :tree="tree"/>
            </v-card>
        </v-layout>
        <v-card-text class="text-md-center" v-if="loading">Chargement...</v-card-text>

        <v-layout v-else-if="!tree"  row wrap justify-center align-center class="ma-4">
            <span class="title">Composition</span>
            <v-card-text class="text-md-center">
                <div>Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche</span> ou prenez
                    un produit du <span><v-icon @click="goBasket" color="primary">shopping_basket</v-icon> panier pour voir sa composition.</span>
                    <br>
                    Vous pouvez aussi <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line"
                                                                                                 color="primary">add</v-icon>Créer un produit ou un service</span>
                    depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line"
                                                                                           color="primary">menu</v-icon>menu de gauche.</span>
                </div>
            </v-card-text>
        </v-layout>

        <span v-else>

            <v-layout hidden-md-and-up>
                <v-expansion-panel popout>

                    <v-expansion-panel-content>
                        <subheader slot="header" icon="info" title="DESCRIPTION"/>
                        <v-card>
                          <description :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <subheader slot="header" icon="call_split" title="USAGE"/>
                        <v-card>
                          <branches :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

                      <v-expansion-panel-content>
                        <subheader slot="header" icon="more_horiz" title="PROPRIETES"/>
                        <v-card>
                          <bilan-ressources :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

                      <v-expansion-panel-content>
                        <subheader slot="header" icon="keyboard_tab" title="EXTERNALITES"/>
                        <v-card>
                          <impacts :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

                      <v-expansion-panel-content>
                        <subheader slot="header" icon="keyboard_tab" title="BILAN EXTERNALITES"/>
                        <v-card>
                          <bilan-impacts :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>
                            <v-expansion-panel-content>
                        <subheader slot="header" icon="call_merge" title="RESSOURCES"/>
                        <v-card>
                          <ressources :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

                        <v-expansion-panel-content>
                        <subheader slot="header" icon="call_merge" title="BILAN RESSOURCES"/>
                        <v-card>
                          <bilan-ressources :tree="tree"/>
                        </v-card>
                      </v-expansion-panel-content>

            </v-expansion-panel>
            </v-layout>



            <v-layout row wrap mx-2 hidden-sm-and-down>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="info" title="DESCRIPTION"/>
                        <v-divider/>
                        <description :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="call_merge" title="RESSOURCES"/>
                        <v-divider/>
                        <ressources :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="call_merge" title="BILAN RESSOURCES"/>
                        <v-divider/>
                        <bilan-ressources :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="more_horiz" title="PROPRIETES"/>
                        <v-divider/>
                        <facets :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="keyboard_tab" title="EXTERNALITES"/>
                        <v-divider/>
                        <impacts :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="keyboard_tab" title="BILAN EXTERNALITES"/>
                        <v-divider/>
                        <bilan-impacts :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <subheader icon="call_split" title="USAGE"/>
                        <v-divider/>
                        <branches :tree="tree"/>
                    </v-card>
                </v-flex>
            </v-layout>
        </span>
        <add-tree-part-btn v-if="tree" :tree="tree"/>
    </v-flex>
</template>

<script>
    import Facets from "./Facets"
    import Branches from "./Branches"
    import Ressources from "./Ressources"
    import Impacts from "./Impacts"
    import {LOAD_OPEN_TREE} from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeHead from "./TreeHead"
    import AddTreePartBtn from "../layout/AddTreePartBtn"
    import BilanImpacts from "./BilanImpacts"
    import BilanRessources from "./BilanRessources"
    import Subheader from "./Subheader"
    import Description from "./Description"

    export default {
        components: {
            Description,
            Subheader,
            BilanRessources,
            BilanImpacts,
            AddTreePartBtn,
            TreeHead,
            Impacts,
            Ressources,
            Branches,
            Facets
        },
        props: ['_id', 'bqt'],
        data: function () {
            return {
                loading: false
            }
        },
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                dispatchLoad: On.LOAD_OPEN_TREE,
                snack: On.SNACKBAR,
                goSearch: On.GO_SEARCH,
                goBasket: On.GO_BASKET,
                goCreateTree: On.GO_CREATE_TREE,
            }),
            refresh: function () {
                if (this.bqt && this._id) {
                    this.loading = true
                    this.dispatchLoad({bqt: this.bqt, _id: this._id})
                        .then(() => this.loading = false)
                        .catch(e => {
                            this.loading = false
                            this.snack({text: "Cet élement n'existe pas ou plus", color: "orange"})
                        })
                }
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
    }
</script>