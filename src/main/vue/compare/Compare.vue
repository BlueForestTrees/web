<template>
    <span>
        <compare-ribbon v-if="leftId && rightId" :axises="axises" :left="compare.left" :right="compare.right" :leftColor="leftColor" :rightColor="rightColor" />
        <v-card-text class="text-md-center" v-else-if="loading">Chargement...</v-card-text>
        <v-card-text class="text-md-center" v-else="!leftId">Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche</span> ou prenez des produits du <span><v-icon @click="goBasket" color="blue">shopping_basket</v-icon> panier pour les comparer.</span></v-card-text>
    </span>

</template>

<script>
    import {buildAxises, separate, updateRatios} from "../../services/axis"
    import On from "../../const/on"
    import {mapState, mapActions} from 'vuex'
    import CompareRibbon from "./CompareRibbon"
    import TreeHead from "../tree/TreeHead"
    import Hider from "../tree/Hider"

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
            Hider,
            TreeHead,
            CompareRibbon
        },
        data: function () {
            return {
                base: null,
                loading: false,
                type: 1,
                types: [{code:1, text:"de l'impact environmental"}]
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
            },
            leftColor:function(){
                return this.compare && this.compare.left && this.compare.left.trunk && this.compare.left.trunk.color
            },
            rightColor:function(){
                return this.compare && this.compare.right && this.compare.right.trunk && this.compare.right.trunk.color
            },
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