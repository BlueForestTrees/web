<template>

    <v-card class="scroll">

        <v-card class="ma-2">
            <tree-ruban-head :tree="tree" @close="$emit('close')" @editQt="openPickQt"/>
        </v-card>

        <selection-dialog :value="treeSelection" @input="pickSelection"/>

        <v-card class="ma-2">
            <v-expansion-panel v-model="activePanelIdx">
                <v-expansion-panel-content :key="panel.title" v-for="(panel, i) in panels">
                    <v-layout row align-center slot="header">
                        <v-list-tile-avatar :class="`${panel.icon} logo`"/>
                        <v-toolbar-title class="font-weight-thin title">{{panel.title}}</v-toolbar-title>
                    </v-layout>
                    <component v-if="activePanelIdx === i" :is="panel.comp" :tree="tree"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import TreeRubanHead from "./TreeRubanHead"
    import {selectionFromTree} from "../../services/calculations"
    import SubpageTitle from "./SubpageTitle"
    import Static from "../mixin/Static"
    import SelectionDialog from "../selection/SelectionDialog"

    const SelectionPicker = () => ({component: import(/* webpackChunkName: "SelectionPicker" */ "./SelectionPicker")})

    const DescriptionSubPage = () => ({component: import(/* webpackChunkName: "DescriptionSubPage" */ "./DescriptionSubPage")})
    const FabricationSubPage = () => ({component: import(/* webpackChunkName: "UtilisationSubPage" */ "./FabricationSubPage")})
    const FacetsSubPage = () => ({component: import(/* webpackChunkName: "FacetsSubPage" */ "./FacetsSubPage")})
    const ImpactsSubPage = () => ({component: import(/* webpackChunkName: "ImpactsSubPage" */ "./ImpactsSubPage")})
    const UtilisationSubPage = () => ({component: import(/* webpackChunkName: "UtilisationSubPage" */ "./UtilisationSubPage")})

    export default {
        name: "TreeRuban",
        props: {tree: Object},
        mixins: [Static],
        components: {
            SelectionDialog,
            UtilisationSubPage,
            SubpageTitle,
            TreeRubanHead,
            SelectionPicker,
            DescriptionSubPage,
            ImpactsSubPage,
            FabricationSubPage,
            FacetsSubPage,
        },
        static: {
            panels: [
                {title: "Description", icon: "docu", comp: "description-sub-page"},
                {title: "Propriétés", icon: "facet", comp: "facets-sub-page"},
                {title: "Impacts", icon: "planet", comp: "impacts-sub-page"},
                {title: "Utilisation", icon: "branches", comp: "utilisation-sub-page"},
                {title: "Fabrication", icon: "roots", comp: "fabrication-sub-page"},
            ]
        },
        data: () => ({
            activePanelIdx: null
        }),
        computed: {
            treeSelection() {
                return this.tree.selection || selectionFromTree(this.tree)
            },
        },
        methods: {
            ...mapActions({
                saveApplySelection: On.SAVE_APPLY_SELECTION
            }),
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

