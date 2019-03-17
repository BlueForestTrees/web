<template>
    <v-layout column :style="menuStyle">
        <v-card class="pl-5 elevation-5" style="height:100%">
            <v-layout row style="height: 100%" ml-1>
                <v-layout column>

                    <v-card class="ma-2 elevation-5">
                        <tree-ruban-head :tree="tree" @close="close" @editQt="openPickQt"/>
                    </v-card>

                    <transition-expand>
                        <v-card v-if="pickQt" class="ma-2">
                            <selection-picker :value="treeSelection" @close="closePickQt" @pick="pickSelection"/>
                        </v-card>
                    </transition-expand>

                    <transition name="slide-fade-simple" mode="out-in">
                        <description-sub-page v-if="tabIdx === 0" :tree="tree" @close="close"/>
                        <impacts-sub-page v-else-if="tabIdx === 1" :tree="tree" @close="close"/>
                        <fabrication-sub-page v-else-if="tabIdx === 2" :tree="tree" @close="close"/>
                    </transition>

                </v-layout>
            </v-layout>
        </v-card>
    </v-layout>

</template>

<script>
    import {mapMutations, mapActions, mapState} from "vuex"
    import TransitionExpand from "../common/TransitionExpand"
    import Do from "../../const/do"
    import On from "../../const/on"
    import TreeRubanHead from "./TreeRubanHead"
    import {selectionFromTree} from "../../services/calculations"

    const SelectionPicker = () => import(/* webpackChunkName: "SelectionPicker" */ "./SelectionPicker")
    const DescriptionSubPage = () => import(/* webpackChunkName: "TreeHP" */ "./DescriptionSubPage")
    const FabricationSubPage = () => import(/* webpackChunkName: "UtilisationSubPage" */ "./FabricationSubPage")
    const FacetsSubPage = () => import(/* webpackChunkName: "FacetsSubPage" */ "./FacetsSubPage")
    const ImpactsSubPage = () => import(/* webpackChunkName: "ImpactsSubPage" */ "./ImpactsSubPage")

    export default {
        name: "TreeRuban",
        props: {tree: Object},
        components: {
            TreeRubanHead,
            TransitionExpand,
            SelectionPicker,
            DescriptionSubPage,
            ImpactsSubPage,
            FabricationSubPage,
            FacetsSubPage,
        },
        data: () => ({pickQt: false}),
        computed: {
            ...mapState({
                tabIdx: s => s.nav.tree.tabIdx
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
        methods: {
            ...mapMutations({
                setTabidx: Do.SET_NAV_TREE_TAB_IDX
            }),
            ...mapActions({
                saveApplySelection: On.SAVE_APPLY_SELECTION
            }),
            close() {
                this.setTabidx(null)
            },
            closePickQt() {
                this.pickQt = false
            },
            openPickQt() {
                this.pickQt = true
            },
            pickSelection(selection) {
                this.saveApplySelection({tree: this.tree, selection})
                    .catch(this.snackError)
                this.closePickQt()
            }
        },
        beforeRouteLeave(to, from, next) {
            this.close()
            next()
        }
    }
</script>

<style scoped>

</style>