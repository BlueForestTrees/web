<template>
    <v-container key="compare">
        <v-layout row align-center mb-4>
            <v-spacer/>
            <v-flex class="title">Comparaison</v-flex>
            <v-select class="title mt-1 ml-1 pl-2" style="max-width: 16em;margin-bottom:0em" :items="types" v-model="type" item-text="text" item-value="code"></v-select>
            <v-spacer/>
        </v-layout>

            <v-card v-if="selectedAxises">
                <v-icon class="corner" x-large @click="zoom = !zoom">{{zoom ? 'pie_chart':'list'}}</v-icon>

                <!--LEGENDE-->
                <v-container>
                    <tree-head :tree="compare.left" class="my-2" @nav="goTree(compare.left)" :style="{cursor: 'pointer'}"/>
                    <v-divider/>
                    <tree-head :tree="compare.right" class="my-2" @nav="goTree(compare.right)" :style="{cursor: 'pointer'}"/>
                </v-container>

                <v-divider></v-divider>

                <compare-ribbon v-if="zoom" :axises="selectedAxises" :leftColor="leftColor" :rightColor="rightColor"/>
                <compare-cams v-else :axises="selectedAxises" :leftColor="leftColor" :rightColor="rightColor"/>
            </v-card>
            <v-card-text class="text-md-center" v-else-if="loading">Chargement...</v-card-text>
            <v-card-text class="text-md-center" v-else="!leftId">Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche</span> ou prenez des produits du <span><v-icon @click="goBasket" color="primary">shopping_basket</v-icon> panier pour les comparer.</span></v-card-text>

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

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
            CompareCams,
            TreeHead,
            CompareRibbon
        },
        data: function () {
            return {
                zoom: false,
                base: null,
                loading: false,
                type: "impactsTank",
                types: [
                    {code: "impactsTank", text: "Impact environmental"},
                    {code: "damagesTank", text: "Dommages environnementeux"}
                ],
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
        computed: {
            ...mapState(['compare']),
            selectedAxises: function () {
                if (this.axises) {
                    return filter(this.axises.common, axis => axis.left.type === this.type)
                }
            },
            axises: function () {
                if (this.compare.leftAxises && this.compare.rightAxises) {
                    this.compare.axis = updateRatios(separate(this.compare.leftAxises, this.compare.rightAxises))
                }
                return this.compare.axis
            },
            leftColor: function () {
                return this.compare && this.compare.left && this.compare.left.trunk && this.compare.left.trunk.color
            },
            rightColor: function () {
                return this.compare && this.compare.right && this.compare.right.trunk && this.compare.right.trunk.color
            },
        },
        methods: {
            ...mapActions({goTree: On.GO_TREE, loadTree: On.LOAD_TREE, snack: On.SNACKBAR, goSearch: On.GO_SEARCH, goBasket: On.GO_BASKET}),
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
            }
        },
    }
</script>
