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
            <v-layout column>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center>
                    <description :tree="tree" class="ma-5"/>
                    <tree-card :tree="tree"/>
                </v-layout>
                <fragment-select :value="currentFragment" @input="navFragment"/>
            </v-layout>
        </v-card>

        <v-container v-if="tree && tree.trunk" style="min-height: 50em">
            <template v-if="currentFragment === IMPACTS">
                <impact-adder v-if="modeAdd" :tree="tree" :selection="selection"/>
                <v-card v-else>
                    <v-container>
                        <div class="display-1 font-weight-thin">Impacts sur l'environnement</div>
                    </v-container>
                    <bilan-impacts :tree="tree" :selection="selection"/>
                </v-card>
            </template>

            <ressources v-if="currentFragment === ROOTS" :tree="tree" :selection="selection"/>

            <template v-if="currentFragment === FACETS">
                <facet-adder v-if="modeAdd" :tree="tree" :selection="selection"/>
                <v-card v-else>
                    <v-container>
                        <div class="display-1 font-weight-thin">Propriétés</div>
                    </v-container>
                    <facets :tree="tree" :selection="selection"/>
                </v-card>
            </template>
        </v-container>

        <tree-fab :tree="tree" @nav="fabnav"></tree-fab>
    </div>

</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import TreeCard from "./TreeCard"
    import Card from "../common/Card"
    import {FACETS, IMPACT_TANK, IMPACTS, ROOTS, TANK, treeFragments} from "../../const/fragments"
    import FragmentSelect from "./FragmentSelect"
    import {GO as Go} from "../../const/go"
    import TransitionExpand from "../common/TransitionExpand"
    import ImpactAdder from "../impact/ImpactAdder"
    import FacetAdder from "../facet/FacetAdder"

    const Description = () => import(/* webpackChunkName: "Description" */ "./Description")
    const Ressources = () => import(/* webpackChunkName: "Ressources" */ "./Ressources")
    const Facets = () => import(/* webpackChunkName: "Facets" */ "./Facets")
    const BilanImpacts = () => import(/* webpackChunkName: "BilanImpacts" */ "./BilanImpacts")
    const Branches = () => import(/* webpackChunkName: "Branches" */ "./Branches")

    export default {
        components: {
            FacetAdder,
            ImpactAdder,
            TransitionExpand,
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
            modeAdd: false,
            selection: [],
            currentFragment: null,
            IMPACTS, ROOTS, FACETS
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
            navFragment(v) {
                this.modeAdd = false
                this.currentFragment = v
            },
            fabnav(fragment) {
                this.currentFragment = fragment
                this.modeAdd = true
            },
            getTreeLoad() {
                if (this.bqt && this._id) {
                    return this.dispatchLoad({bqt: this.bqt, _id: this._id, fragments: treeFragments})
                } else if (this.sid) {
                    return this.dispatchSelLoad({_id: this.sid, fragments: treeFragments})
                } else {
                    console.warn(`bad params. bqt:${this.bqt}, _id:${this._id}, sid:${this.sid}`)
                    this.$router.push({name: Go.NOT_FOUND})
                }
            },
            refresh: async function () {
                const treeLoad = await this.getTreeLoad()
                if (treeLoad) {
                    const tree = await treeLoad
                    try {
                        await tree.promises.all
                        if (tree[TANK].length > 0) {
                            this.currentFragment = ROOTS
                        } else if (tree[IMPACT_TANK].length > 0) {
                            this.currentFragment = IMPACTS
                        } else if (tree[FACETS].length > 0) {
                            this.currentFragment = FACETS
                        }
                    } catch (e) {
                        if (e.status === 404) {
                            this.snack({text: "L'élément n'a pas été trouvé :(", color: "orange"})
                        }
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