<template>
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
                    <fragment-select v-model="viewDetail"/>
                </v-layout>
            </v-layout>
        </v-card>

        <v-window v-model="viewDetail">
            <v-window-item lazy><bilan-impacts :tree="tree" :selection="selection"/></v-window-item>
            <v-window-item lazy><ressources :tree="tree" :selection="selection"/></v-window-item>
            <v-window-item lazy><facets :tree="tree" :selection="selection"/></v-window-item>
        </v-window>

        <tree-fab :tree="tree"></tree-fab>
    </div>

</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import TreeCard from "./TreeCard"
    import Card from "../common/Card"
    import {FACETS, IMPACT_TANK, TANK, treeFragments} from "../../const/fragments"
    import FragmentSelect from "./FragmentSelect"

    const Description = () => import(/* webpackChunkName: "Description" */ "./Description")
    const Ressources = () => import(/* webpackChunkName: "Ressources" */ "./Ressources")
    const Facets = () => import(/* webpackChunkName: "Facets" */ "./Facets")
    const BilanImpacts = () => import(/* webpackChunkName: "BilanImpacts" */ "./BilanImpacts")
    const Branches = () => import(/* webpackChunkName: "Branches" */ "./Branches")

    export default {
        components: {
            FragmentSelect,
            Card,
            TreeCard,
            Description,
            BilanImpacts,
            TreeFab,
            Ressources,
            Branches,
            Facets
        },
        data: () => ({
            selection: [],
            viewDetail: 0
        }),
        props: ['_id', 'bqt', 'sid'],
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_SELECTION,
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
                        this.viewDetail = 1
                    } else if (tree[IMPACT_TANK].length > 0) {
                        this.viewDetail = 0
                    } else if (tree[FACETS].length > 0) {
                        this.viewDetail = 2
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