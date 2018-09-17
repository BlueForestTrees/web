<template>
        <card>
            <template slot="content">
                <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
                <img src="/img/blue.svg" style="width:20%">
                <img src="/img/forest.svg" style="width:28%">
                <v-card-text>
                    <p>Bonjour!</p>
                    <p>BlueForest est un projet sur l'environnement pour les particuliers et les entreprises. Ici, on peut trouver des informations sur les produits, mais on peut aussi en mettre (il faut alors s'identifier).</p>
                    <p> On peut aussi comparer des produits ou des services. On peut réutiliser les produits de certains pour faire ses propres produits. On peut partager ses recettes! Que ce soit la recette pour faire un gâteau, ou celle pour fabriquer une voiture.</p>
                    <p>Et quand une information manque, on peut la demander. Pour montrer aux entreprises que l'on s'intéresse à ce qu'ils font, comment ils le font...</p>
                    <p>BlueForest est une organisation à but non-lucratif mais qui a besoin de soutien pour exister.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="$router.push({name:GO.PLAN})">Ok</v-btn>
                </v-card-actions>
            </template>
        </card>
</template>

<script>
    import RightMenu from "./layout/RightMenu"
    import {GO} from "../const/go"
    import On from "../const/on"
    import {mapActions} from "vuex"
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