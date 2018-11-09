<template>
    <v-flex key="basket">
        <v-layout row wrap justify-center align-center class="ma-4">
            <v-icon color="blue">shopping_basket</v-icon>
            <span class="title">Panier</span>
        </v-layout>
        <v-divider/>
        <v-card-text v-if="emptyBasket" class="text-md-center">Votre panier est vide. <br>Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche pour trouver des choses à mettre dans le panier.</span></v-card-text>

        <span v-else>
            <span v-if="trunks.length">
                <v-container>
                    <h1 class="display-1">Produits, Services</h1>
                </v-container>
                <basket-comp :items="trunks"/>
                <v-divider/>
            </span>
            <span v-if="impacts.length">
                <v-container>
                    <h1 class="display-1">Environnement</h1>
                </v-container>
                <basket-comp :items="impacts"/>
                <v-divider/>
            </span>
            <span v-if="damages.length">
                <v-container>
                    <h1 class="display-1">Dommages</h1>
                </v-container>
                <basket-comp :items="damages"/>
                <v-divider/>
            </span>
            <span v-if="facets.length">
                <v-container>
                    <h1 class="display-1">Propriétés</h1>
                </v-container>
                <basket-comp :items="facets"/>
                <v-divider/>
            </span>
        </span>

    </v-flex>
</template>

<script>
    import BasketComp from "./BasketComp"
    import {mapGetters, mapActions} from "vuex"
    import On from "../../const/on"

    export default {
        name: 'basket',
        components: {BasketComp},
        computed: {
            ...mapGetters({
                trunks: 'basketArray',
                impacts: 'basketImpactArray',
                damages: 'basketDamageArray',
                facets: 'basketFacetArray',
                emptyBasket: 'emptyBasket'
            })
        },
        methods: {
            ...mapActions({goSearch: On.GO_SEARCH})
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>