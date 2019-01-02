<template>
    <v-flex key="tree">

        <v-layout v-if="!tree" row wrap justify-center align-center class="ma-4">
            <span class="title">Composition</span>
            <v-card-text class="text-md-center">
                <div>Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche</span> ou prenez
                    un produit du <span><v-icon @click="goBasket" color="primary">shopping_basket</v-icon> panier pour voir sa composition.</span>
                    <br>
                    Vous pouvez aussi <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                    depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                </div>
            </v-card-text>
        </v-layout>

        <div v-else>

            <v-card>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center>
                    <description :tree="tree" class="ma-5"/>
                    <v-layout column align-center>
                        <tree-card :tree="tree"/>
                        <v-select v-model="current" :items="['Environnement','Ressources','Propriétés']" class="not-too-half"/>
                    </v-layout>
                </v-layout>
            </v-card>

            <ressources v-if="current === 'Ressources'" :tree="tree" :selection="selection"/>
            <card>
                <facets v-if="current === 'Propriétés'" :tree="tree" :selection="selection"/>
                <bilan-impacts v-if="current === 'Environnement'" :tree="tree" :selection="selection"/>
                <branches v-if="current === 'branch'" :tree="tree"/>
            </card>

            <tree-fab :tree="tree"></tree-fab>
        </div>


    </v-flex>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import TreeCard from "./TreeCard"
    import Card from "../common/Card"
    import {FACETS, IMPACT_TANK, TANK, treeFragments} from "../../const/fragments"

    const Description = () => import(/* webpackChunkName: "Description" */ "./Description")
    const Ressources = () => import(/* webpackChunkName: "Ressources" */ "./Ressources")
    const Facets = () => import(/* webpackChunkName: "Facets" */ "./Facets")
    const BilanImpacts = () => import(/* webpackChunkName: "BilanImpacts" */ "./BilanImpacts")
    const Branches = () => import(/* webpackChunkName: "Branches" */ "./Branches")

    export default {
        components: {
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
                current: "Propriétés"
            }
        },
        props: ['_id', 'bqt', 'sid'],
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_OPEN_SELECTION,
                snack: On.SNACKBAR,
                goSearch: On.GO_SEARCH,
                goBasket: On.GO_BASKET,
                goCreateTree: On.GO_CREATE_TREE,
            }),
            getTreeLoad() {
                if (this.bqt && this._id) {
                    return this.dispatchLoad({bqt: this.bqt, _id: this._id, fragments: treeFragments})
                } else if (this.sid) {
                    return this.dispatchSelLoad({_id: this.sid, fragments: treeFragments})
                } else {
                    console.warn(`bad params. bqt:${this.bqt}, _id:${this._id}, sid:${this.sid}`)
                }
            },
            refresh: async function () {
                const treeLoad = this.getTreeLoad()
                if (treeLoad) {
                    const tree = await treeLoad
                    await tree.promises.all
                    if (tree[TANK].length > 0) {
                        this.current = "Ressources"
                    } else if (tree[IMPACT_TANK].length > 0) {
                        this.current = "Environnement"
                    } else if (tree[FACETS].length > 0) {
                        this.current = "Propriétés"
                    }
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