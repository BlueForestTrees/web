<template>
    <v-flex key="tree">

        <v-layout v-if="!tree" row wrap justify-center align-center class="ma-4">
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

        <v-layout column v-else>

            <v-card>
                <tree-card :tree="tree" />
                <select-attribute-bar @change="v => current = v"/>
            </v-card>

            <ressources v-if="current === 'root'" :tree="tree" :selection="selection"/>
            <card>
                <description v-if="!current" :tree="tree"/>
                <facets v-if="current === 'facet'" :tree="tree" :selection="selection"/>
                <bilan-impacts v-if="current === 'impact'" :tree="tree" :selection="selection"/>
                <branches v-if="current === 'branch'" :tree="tree"/>
            </card>

            <tree-fab :tree="tree"></tree-fab>
        </v-layout>


    </v-flex>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import TreeCard from "./TreeCard"
    import Card from "../common/Card"
    import SelectAttributeBar from "./SelectAttributeBar"

    const Description = () => import(/* webpackChunkName: "Description" */ "./Description")
    const Ressources = () => import(/* webpackChunkName: "Ressources" */ "./Ressources")
    const Facets = () => import(/* webpackChunkName: "Facets" */ "./Facets")
    const BilanImpacts = () => import(/* webpackChunkName: "BilanImpacts" */ "./BilanImpacts")
    const Branches = () => import(/* webpackChunkName: "Branches" */ "./Branches")

    export default {
        components: {
            SelectAttributeBar,
            Card,
            TreeCard,
            Description,
            BilanImpacts,
            TreeFab,
            Ressources,
            Branches,
            Facets
        },
        data() {
            return {
                selection: [],
                current: null
            }
        },
        props: ['_id', 'bqt'],
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
                    this.dispatchLoad({bqt: this.bqt, _id: this._id})
                        .catch(e => {
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