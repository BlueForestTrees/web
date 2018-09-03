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
            <v-layout row wrap mx-2>
                <v-flex pa-2>
                    <v-card>
                        <ressources :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <bilan-ressources :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <facets :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <impacts :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
                        <bilan-impacts :tree="tree"/>
                    </v-card>
                </v-flex>
                <v-flex pa-2>
                    <v-card>
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

    export default {
        components: {
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