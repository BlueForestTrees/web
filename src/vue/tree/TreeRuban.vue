<template>

    <v-card class="scroll">

        <v-card class="ma-2">
            <tree-ruban-head :tree="tree" @close="$emit('close')" @editQt="openPickQt"/>
        </v-card>

        <transition-expand>
            <v-card v-if="pickQt" class="ma-2">
                <selection-picker :value="treeSelection" @close="closePickQt" @pick="pickSelection"/>
            </v-card>
        </transition-expand>

        <v-card class="ma-2">
            <v-expansion-panel inset>
                <v-expansion-panel-content key="description">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar class="docu logo"/>
                        <v-toolbar-title class="font-weight-thin title">Description</v-toolbar-title>
                    </v-layout>
                    <description-sub-page :tree="tree"/>
                </v-expansion-panel-content>

                <v-expansion-panel-content key="facet">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar class="facet logo"/>
                        <v-toolbar-title class="font-weight-thin title">Propriétés</v-toolbar-title>
                    </v-layout>
                    <facets-sub-page :tree="tree"/>
                </v-expansion-panel-content>

                <v-expansion-panel-content key="impact">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar class="planet logo"/>
                        <v-toolbar-title class="font-weight-thin title">Impacts</v-toolbar-title>
                    </v-layout>
                    <impacts-sub-page :tree="tree"/>
                </v-expansion-panel-content>

                <v-expansion-panel-content key="util">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar class="branches logo"/>
                        <v-toolbar-title class="font-weight-thin title">Utilisation</v-toolbar-title>
                    </v-layout>
                    <utilisation-sub-page :tree="tree"/>
                </v-expansion-panel-content>

                <v-expansion-panel-content key="fab">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar class="roots logo"/>
                        <v-toolbar-title class="font-weight-thin title">Fabrication</v-toolbar-title>
                    </v-layout>
                    <fabrication-sub-page :tree="tree"/>
                </v-expansion-panel-content>

            </v-expansion-panel>
        </v-card>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex"
    import TransitionExpand from "../common/TransitionExpand"
    import On from "../../const/on"
    import TreeRubanHead from "./TreeRubanHead"
    import {selectionFromTree} from "../../services/calculations"
    import SubpageTitle from "./SubpageTitle"
    import UtilisationSubPage from "./UtilisationSubPage"

    const SelectionPicker = () => import(/* webpackChunkName: "SelectionPicker" */ "./SelectionPicker")
    const DescriptionSubPage = () => import(/* webpackChunkName: "TreeHP" */ "./DescriptionSubPage")
    const FabricationSubPage = () => import(/* webpackChunkName: "UtilisationSubPage" */ "./FabricationSubPage")
    const FacetsSubPage = () => import(/* webpackChunkName: "FacetsSubPage" */ "./FacetsSubPage")
    const ImpactsSubPage = () => import(/* webpackChunkName: "ImpactsSubPage" */ "./ImpactsSubPage")

    export default {
        name: "TreeRuban",
        props: {tree: Object},
        components: {
            UtilisationSubPage,
            SubpageTitle,
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
            treeSelection() {
                return this.tree.selection || selectionFromTree(this.tree)
            },
        },
        methods: {
            ...mapActions({
                saveApplySelection: On.SAVE_APPLY_SELECTION
            }),
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
    .v-expansion-panel__header {
        padding: 0 !important;
    }
</style>