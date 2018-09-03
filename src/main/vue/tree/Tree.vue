<template>
    <span>
        <hider title="Composition"/>
        <v-card-text class="text-md-center" v-if="loading">Chargement...</v-card-text>

        <v-card-text v-else-if="!tree" class="text-md-center">
            <div>Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche</span> ou prenez un produit du <span><v-icon @click="goBasket" color="blue">shopping_basket</v-icon> panier pour voir sa composition.</span></div>
        </v-card-text>

        <span v-else>
            <v-layout row wrap justify-center>
                <v-card class="ma-1 pl-2 pr-3" style="border-radius:2em">
                    <tree-head class="my-2" :tree="tree"/>
                </v-card>
            </v-layout>

            <v-layout hidden-md-and-up>
                <v-expansion-panel popout>
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
                <subheader slot="header" icon="call_split" title="USAGE"/>
                <v-card>
                  <branches :tree="tree"/>
                </v-card>
              </v-expansion-panel-content>

            </v-expansion-panel>
            </v-layout>



            <v-layout row wrap mx-2 hidden-sm-and-down>
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
        <add-tree-part-btn :tree="tree"/>
    </span>
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
    import Hider from "./Hider"
    import Subheader from "./Subheader"

    export default {
        components: {
            Subheader,
            Hider,
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
            ...mapActions({dispatchLoad: On.LOAD_OPEN_TREE, snack: On.SNACKBAR, goSearch: On.GO_SEARCH, goBasket: On.GO_BASKET}),
            refresh: function () {
                if(this.bqt && this._id) {
                    this.loading = true
                    this.dispatchLoad({bqt: this.bqt, _id: this._id})
                        .then(()=>this.loading = false)
                        .catch(e => {
                            this.loading = false
                            this.snack({text: "Cet élement n'existe pas ou plus", color: "red"})
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