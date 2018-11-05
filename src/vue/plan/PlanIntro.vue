<template>
        <card>
            <template>
                <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
                <img src="/img/blue.svg" style="width:20%">
                <img src="/img/forest.svg" style="width:28%">
                <v-card-text>
                    <p>Bonjour!</p>
                    <p>BlueForest permet de découvrir nos activités et celle des autres d'une nouvelle manière.</p>
                    <p>Au menu: parmi toutes nos activités, comme par exemple manger des bananes, acheter un jean, construire une éolienne, louer un photocopieur, envoyer un mail, faire 1000km en avion, etc. qu'est ce qui contient le plus de pollution, de vitamines, d'heures de travail respectant peu les droits de l'homme?</p>
                    <p>On peut créer ses propres produits ou services (après s'être identifié), et partager ses recettes. Celle pour faire un gâteau, ou celle pour fabriquer une voiture. Que l'on soit une entreprise de 150000 personnes ou un particulier, la démarche reste la même.</p>
                    <p>Les particuliers et les entreprises peuvent donner et recevoir des idées. Pour s'apercevoir qu'il est parfois très difficile de se passer d'une pollution, ou au contraire très facile.</p>
                    <p>BlueForest est l'endroit de récolte et de construction des informations sur nos produits, afin d'avoir la connaissance des points forts ou faibles des alternatives</p>
                    <p>Si une information manque, on peut la demander.</p>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:GO.SUSCRIBE}">S'inscrire</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="$router.push({name:GO.HOME})">Entrer</v-btn>
                </v-card-actions>
            </template>
        </card>
</template>

<script>
    import RightMenu from "../messages/Messages"
    import {GO} from "../../const/go"
    import Card from "../common/Card"

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