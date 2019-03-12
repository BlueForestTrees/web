<template>

    <div v-if="tree && tree.trunk" style="height: 100%">

        <tree-nav2 :tree="tree"/>

        <transition name="slide-left-right">
            <v-layout v-if="oneSelected" column :style="menuStyle">
                <v-card class="pl-5 elevation-5" style="height:100%">
                    <v-layout row style="height: 100%" ml-1>
                        <v-divider vertical/>
                        <v-layout column>
                            <subpage-title sub color="primary" :title="qtUnitName(oneSelected)" centered>
                                <v-btn icon slot="left" @click="openPickQt"><v-icon class="carton logo-petit"/></v-btn>
                                <template slot="right">
                                    <v-btn icon flat @click="deleteTree"><v-icon color="white">delete</v-icon></v-btn>
                                    <v-btn icon @click="close"><v-icon color="white">arrow_back</v-icon></v-btn>
                                </template>
                            </subpage-title>

                            <transition-expand>
                                <v-card v-if="pickQt" class="ma-2">
                                    <selection-picker :value="treeSelection" @close="closePickQt" @pick="pickSelection"/>
                                </v-card>
                            </transition-expand>


                            <transition name="slide-fade-simple" mode="out-in">
                                    <tree-headpage v-if="tabIdx === 0" :tree="oneSelected" @close="close"/>
                                    <impacts-sub-page v-else-if="tabIdx === 1" :tree="oneSelected" @close="close"/>
                                    <facets-sub-page v-else-if="tabIdx === 2" :tree="oneSelected" @close="close"/>
                                    <ressources-sub-page v-else-if="tabIdx === 3" :tree="oneSelected" @close="close"/>
                            </transition>

                        </v-layout>
                    </v-layout>
                </v-card>
            </v-layout>
        </transition>


        <transition name="slide-left-right">
            <tree-menu v-if="oneSelected" :value="tabIdx" @input="setTabidx" :tree="oneSelected" class="mt-5 top-left"/>
        </transition>
    </div>

</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import {FACETS, IMPACTS, ROOTS, treeHeadFragments} from "../../const/fragments"
    import Do from "../../const/do"
    import TreeNav2 from "../treenav/TreeNav2"
    import Selectable from "../mixin/Selectable"
    import SubpageTitle from "./SubpageTitle"
    import Closer from "../common/Closer"
    import {qtUnitName, selectionFromTree} from "../../services/calculations"
    import SelectionPicker from "./SelectionPicker"
    import TransitionExpand from "../common/TransitionExpand"


    const TreeHeadpage = () => import(/* webpackChunkName: "TreeHP" */ "./TreeHeadPage")
    const TreeMenu = () => import(/* webpackChunkName: "TreeMenu" */ "./TreeMenu")
    const RessourcesSubPage = () => import(/* webpackChunkName: "RessourcesSubPage" */ "./RessourcesSubPage")
    const FacetsSubPage = () => import(/* webpackChunkName: "FacetsSubPage" */ "./FacetsSubPage")
    const ImpactsSubPage = () => import(/* webpackChunkName: "ImpactsSubPage" */ "./ImpactsSubPage")

    export default {
        components: {
            TransitionExpand,
            SelectionPicker,
            Closer,
            SubpageTitle,
            TreeMenu,
            TreeNav2,
            TreeHeadpage,
            ImpactsSubPage,
            RessourcesSubPage,
            FacetsSubPage,
            TreeFab,
        },
        data: () => ({
            IMPACTS, ROOTS, FACETS,
            pickQt: false
        }),
        mixins: [Selectable],
        props: ['_id', 'bqt', 'sid'],
        mounted: function () {
            this.refresh()
        },
        computed: {
            ...mapState({
                tree: s => s.tree,
                modeAdd: s => s.nav.tree.modeAdd,
                tabIdx: s => s.nav.tree.tabIdx,
                menu: s => s.nav.tree.menu,
                selection: s => s.nodeSelection
            }),
            menuWidth() {
                return this.tab === null ? 50 : 450
            },
            menuStyle() {
                return {
                    width: `${this.menuWidth}px`,
                    height: "100%"
                }
            },
            treeSelection() {
                return this.tree.selection || selectionFromTree(this.tree)
            },
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        methods: {
            closePickQt(){
                this.pickQt = false
            },
            openPickQt(){
                this.pickQt = true
            },
            pickSelection(selection) {
                this.saveApplySelection({tree: this.tree, selection})
                    .catch(this.snackError)
                this.closePickQt()
            },
            qtUnitName,
            ...mapMutations({
                setTabidx: Do.SET_NAV_TREE_TAB_IDX,
                setMenu: Do.SET_NAV_TREE_MENU
            }),
            ...mapActions({
                saveApplySelection: On.SAVE_APPLY_SELECTION,
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_SELECTION,
                snack: On.SNACKBAR,
                snackError: On.SNACKERROR,
                goHome: On.GO_HOME,
                deleteTree: On.DELETE_OPENED_TREE,
            }),
            close() {
                this.unselect()
            },
            getTreeLoad() {
                if (this.bqt && this._id) {
                    if (!this.tree || this.tree._id !== this._id
                        ||
                        !this.tree.trunk || this.tree.trunk.quantity.bqt !== this.bqt) {
                        return this.dispatchLoad({bqt: this.bqt, _id: this._id, fragments: treeHeadFragments})
                    }
                } else if (this.sid) {
                    return this.dispatchSelLoad({_id: this.sid, fragments: treeHeadFragments})
                } else {
                    console.warn(`bad params. bqt:${this.bqt}, _id:${this._id}, sid:${this.sid}`)
                }
            },
            refresh: async function () {
                const work = this.getTreeLoad()
                work && work.then(tree => tree.promises.all.catch(this.snackError))
            }
        },
        beforeRouteLeave(to, from, next) {
            this.close()
            next()
        }
    }
</script>