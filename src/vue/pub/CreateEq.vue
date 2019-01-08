<template>
    <span>
        <v-toolbar class="elevation-0" color="primary" dark>
            <v-toolbar-title class="display-1">Créer une équivalence</v-toolbar-title>
        </v-toolbar>
        <v-toolbar class="elevation-0" color="primary" dark>
            <v-toolbar-title class="font-weight-thin">Choisissez deux produits et un axe de comparaison.</v-toolbar-title>
        </v-toolbar>
        <v-divider/>
        <v-layout :column="$vuetify.breakpoint.smAndDown" justify-center>
            <v-card>
                <v-layout key="create-tree" column wrap justify-center align-center>
                    <v-stepper v-model="idx" vertical class="elevation-0">
                        <v-stepper-step :editable="idx > 1" step="1" :complete="idx > 1">Choisir le produit A</v-stepper-step>
                        <v-stepper-step :editable="idx > 2" step="2" :complete="idx > 2">Choisir le produit B</v-stepper-step>
                        <v-stepper-step :editable="idx > 3" step="3" :complete="idx > 3">Choisir l'axe de comparaison</v-stepper-step>
                    </v-stepper>
                </v-layout>
            </v-card>
            <v-layout column align-center>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center my-5>
                    <tree-card v-if="aTree" :tree="aTree"></tree-card>
                    <v-card v-else class="pa-4">
                        <v-flex class="bold-font display-2">A</v-flex>
                    </v-card>
                    <p class="bold-font align display-2 ma-4">=</p>
                    <tree-card v-if="bTree" :tree="bTree"></tree-card>
                    <v-card v-else class="pa-4">
                        <v-flex class="bold-font display-2">B</v-flex>
                    </v-card>
                </v-layout>
                <p v-if="fragment">D'un point de vue du {{fragment.item.name}}</p>
            </v-layout>
        </v-layout>
        <v-divider/>
        <tree-selection-finder v-if="idx <= 2" @select="selectProduct"/>
        <attribute-finder v-else-if="!fragment" :trees="[aTree, bTree]" @select="selectFragment"/>
    </span>
</template>
<script>
    import Card from "../common/Card"
    import TreeCard from "../tree/TreeCard"
    import TreeSelectionFinder from "../tree/TreeSelectionFinder"
    import AttributeFinder from "../tree/AttributeFinder"

    export default {
        name: "create-eq",
        components: {AttributeFinder, TreeSelectionFinder, TreeCard, Card},
        data: () => ({idx: null, aTree: null, bTree: null, fragment: null}),
        methods: {
            selectProduct(tree) {
                this.idx === "1" ? this.aTree = tree : this.bTree = tree
                this.idx++
            },
            selectFragment(fragment) {
                this.fragment = fragment
                this.idx++
            }
        },
        watch: {
            idx(v, oldV) {
                if (v < oldV) {
                    if (v <= 1) {
                        this.aTree = null
                    }
                    if (v <= 2) {
                        this.bTree = null
                    }
                    if (v <= 3) {
                        this.fragment = null
                    }
                }
            }
        }
    }
</script>