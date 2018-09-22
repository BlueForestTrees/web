<template>
        <card>
            <template slot="content">
                <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
                <img src="/img/blue.svg" style="width:20%">
                <img src="/img/forest.svg" style="width:28%">
                <v-card-text>
                    <p>Bonjour!</p>
                    <p>BlueForest est une application pour l'environnement, les particuliers et les entreprises. On peut trouver des informations sur les produits, on peut aussi en mettre (après s'être identifié).</p>
                    <p>On peut comparer des produits sur leur propriétés et sur leur impact sur l'environnement. On peut créer ses propres produits ou services.
                        On peut partager ses recettes! Celle pour faire un gâteau, ou celle pour fabriquer une voiture.</p>
                    <p>Si un produit ou une information manque, on peut la demander. Pour montrer aux entreprises que l'on s'intéresse à ce qu'ils font, comment ils le font...</p>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:GO.SUSCRIBE}">S'inscrire</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="$router.push({name:GO.PLAN})">Suite</v-btn>
                </v-card-actions>
            </template>
        </card>
</template>

<script>
    import RightMenu from "./layout/Messages"
    import {GO} from "../const/go"
    import Card from "./layout/Card"

    export default {
        name: "plan-intro",
        components: {Card, RightMenu},
        data() {
            return {
                GO
            }
        },
        methods: {}
    }
</script>

<style>
    p{
        margin-left:0
    }
</style>