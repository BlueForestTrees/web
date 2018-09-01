<template>
    <span>
        <v-card-title primary-title>
            <div class="headline">Comparaison</div>
            <v-spacer/>
            <v-btn-toggle v-model="zoom" v-if="leftId && rightId">
              <v-btn>
                <v-icon>search</v-icon>
              </v-btn>
            </v-btn-toggle>
        </v-card-title>
        <v-card-text v-if="loading">Chargement...</v-card-text>
        <v-card-text v-else-if="!leftId">Aucun produit à comparer.<br> Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche</span> ou prenez des produits du <span><v-icon @click="goBasket" color="blue">shopping_basket</v-icon> panier</span></v-card-text>
        <v-card-text v-else-if="!rightId">Un seul produit à comparer.<br> Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche</span> ou prenez des produits du <span><v-icon @click="goBasket" color="blue">shopping_basket</v-icon> panier</span></v-card-text>
        <compare-ribbon v-else :axises="axises" :left="compare.left" :right="compare.right" :zoom="zoom===0"/>
    </span>

</template>

<script>
    import {buildAxises, separate, updateRatios} from "../../services/axis"
    import On from "../../const/on"
    import {mapState, mapActions} from 'vuex'
    import CompareRibbon from "./CompareRibbon"
    import TreeHead from "../tree/TreeHead"

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
            TreeHead,
            CompareRibbon
        },
        data: function () {
            return {
                zoom: false,
                base: null,
                leftColor: "cyan darken1",
                rightColor: "pink darken1",
                loading: false
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
        computed:{
            ...mapState(['compare']),
            axises: function(){
                if (this.compare.leftAxises && this.compare.rightAxises) {
                    this.compare.axis = updateRatios(separate(this.compare.leftAxises, this.compare.rightAxises))
                }
                return this.compare.axis
            }
        },
        methods: {
            ...mapActions({loadTree: On.LOAD_TREE, snack: On.SNACKBAR, goSearch: On.GO_SEARCH, goBasket: On.GO_BASKET}),
            refresh: async function(){
                this.compare.axis = null
                if(this.leftId) {
                    this.compare.left = await this.loadTree({_id: this.leftId})
                    this.compare.left.promises.all.then(() => this.compare.leftAxises = buildAxises(this.compare.left))
                }
                if(this.rightId) {
                    this.compare.right = await this.loadTree({_id: this.rightId})
                    this.compare.right.promises.all.then(() => this.compare.rightAxises = buildAxises(this.compare.right))
                }
            }
        },
    }
</script>