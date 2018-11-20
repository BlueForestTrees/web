<template>
    <v-container key="compare">
        <v-layout row align-center mb-4>
            <v-spacer/>
            <v-flex class="title">Comparaison</v-flex>
        </v-layout>
        <v-card-text v-if="!compare.left || !compare.right" class="text-md-center">Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche</span> ou prenez des produits du <span><v-icon @click="goBasket" color="primary">shopping_basket</v-icon> panier pour les comparer.</span></v-card-text>

        <span v-else>
            <v-card>
                <v-layout :column="$vuetify.breakpoint.xsOnly" align-content-center justify-center>
                    <tree-card :tree="compare.left" @nav="goTree(compare.left)" :style="{cursor: 'pointer'}" selectable/>
                    <tree-card :tree="compare.right" @nav="goTree(compare.right)" :style="{cursor: 'pointer'}" selectable/>
                </v-layout>
                <v-layout :column="$vuetify.breakpoint.xsOnly" align-content-center>
                        <v-checkbox v-model="selectedDomain" label="ENVIRONNEMENT" value="impactsTank"></v-checkbox>
                        <v-checkbox v-model="selectedDomain" label="RESSOURCES" value="tank"></v-checkbox>
                        <v-checkbox v-model="selectedDomain" label="PROPRIETES" value="facets"></v-checkbox>
                </v-layout>
            </v-card>
        </span>

        <v-card v-if="hasAxises">
            <v-layout row align-center pl-4 pt-4>
                <v-icon class="corner" x-large @click="zoom = !zoom">{{zoom ? 'close':'search'}}</v-icon>
            </v-layout>

            <compare-ribbon v-if="zoom" :axises="selectedAxises" :leftColor="leftColor" :rightColor="rightColor"/>
            <compare-cams v-else :axises="selectedAxises" :leftColor="leftColor" :rightColor="rightColor"/>
        </v-card>

    </v-container>

</template>

<script>
    import {buildAxises, separate, updateRatios} from "../../services/axis"
    import On from "../../const/on"
    import {mapState, mapActions} from 'vuex'

    const CompareRibbon = () => import(/* webpackChunkName: "Cribbon" */"./CompareRibbon")
    const CompareCams = () => import(/* webpackChunkName: "Ccams" */"./CompareCams")
    import TreeHead from "../tree/TreeHead"
    import {filter} from "unit-manip"
    import TreeCard from "../tree/TreeCard"

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
            TreeCard,
            CompareCams,
            TreeHead,
            CompareRibbon
        },
        data: function () {
            return {
                zoom: false,
                base: null,
                selectedDomain: []
            }
        },
        created: async function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        methods: {
            refresh: async function () {
                this.compare.axis = null
                if (this.leftId) {
                    this.compare.left = await this.loadTree({_id: this.leftId})
                    this.compare.left.promises.all.then(() => this.compare.leftAxises = buildAxises(this.compare.left))
                }
                if (this.rightId) {
                    this.compare.right = await this.loadTree({_id: this.rightId})
                    this.compare.right.promises.all.then(() => this.compare.rightAxises = buildAxises(this.compare.right))
                }
            },
            ...mapActions({goTree: On.GO_TREE, loadTree: On.LOAD_TREE, snack: On.SNACKBAR, goSearch: On.GO_SEARCH, goBasket: On.GO_BASKET}),
        },
        computed: {
            ...mapState(['compare']),
            axises: function () {
                if (this.compare.leftAxises && this.compare.rightAxises) {
                    this.compare.axis = updateRatios(separate(this.compare.leftAxises, this.compare.rightAxises))
                }
                return this.compare.axis
            },


            selectedAxises() {
                return this.axises && filter(this.axises.common, axis => this.selectedDomain.includes(axis.left.type))
            },


            hasAxises() {
                return this.selectedAxises && this.selectedAxises.length !== 0
            },
            leftColor: function () {
                return this.compare && this.compare.left && this.compare.left.trunk && this.compare.left.trunk.color || "#0000BB"
            },
            rightColor: function () {
                return this.compare && this.compare.right && this.compare.right.trunk && this.compare.right.trunk.color || "#00FF00"
            },
        },
    }
</script>
