<template>
    <v-container class="not-too-large not-too-small">
        <v-card class="not-too-large">

            <div>
                <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
                <img src="/img/blue.svg" style="width:20%" class="mb-3 ml-2">
                <img src="/img/forest.svg" style="width:28%" class="mb-3">
            </div>

            <v-card-text class="subheading font-weight-thin">
                <p class="bold-font ml-4">Bonjour!</p>
                <p>BlueForest permet de comprendre les activités humaines d'une nouvelle manière.</p>
                <p>Parmi ces activités, par exemple manger des bananes, acheter un jean, construire une éolienne, louer un photocopieur, envoyer un mail, faire 1000km en avion, etc. qu'est ce qui contient le plus de pollution, de vitamines, d'heures de travail respectant peu les droits de l'homme?</p>
            </v-card-text>

            <v-card-actions>
                <v-layout align-content-center>
                    <v-flex>
                        <router-link :to="{name:GO.DATA_EXPLAINED}">
                            <v-icon color="primary">domain</v-icon>
                            D'où viennent les données?
                        </router-link>
                    </v-flex>
                    <v-flex>
                        <router-link :to="{name:GO.ROAD_MAP}">
                            <v-icon color="orange">new_releases</v-icon>
                            Fonctions à venir
                        </router-link>
                    </v-flex>
                    <v-flex>
                        <router-link :to="{name:GO.PLAN}">
                            <img src="img/brain.svg" class="logo-petit"/>
                            En savoir plus
                        </router-link>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import RightMenu from "../messages/Messages"
    import {GO} from "../../const/go"
    import Card from "../common/Card"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "bf-cest-quoi",
        components: {Card, RightMenu},
        data() {
            return {
                GO
            }
        },
        methods: {
            ...mapActions({
                goto: On.GO_TO
            })
        }
    }
</script>

<style>
    p {
        margin-left: 0
    }
</style>