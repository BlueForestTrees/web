<template>
    <v-container>
        <v-flex mt-3>

            <v-layout row justify-center mb-3>
                <img src="/img/blue.svg" style="width:20%">
                <img src="/img/logo.svg" style="width:30%">
                <img src="/img/forest.svg" style="width:28%">
            </v-layout>

            <v-layout v-if="!user" row align-center justify-center mb-5>
                <v-icon>person</v-icon>
                <p class="mb-0">Vous n'êtes pas connecté.</p>
            </v-layout>

            <v-layout align-center ma-2>
                <v-icon color="orange" large>new_releases</v-icon>
                <v-layout column mx-2>
                    <span>Cette icône indique les fonctions en cours de développement ou à l'étude.</span>
                    <span> Retrouvez-les toutes dans la section « <router-link :to="{name:GO.ROAD_MAP}"><v-icon color="primary">chrome_reader_mode</v-icon>Fonctions à venir »</router-link> du menu de gauche et donnez votre avis</span>
                </v-layout>
            </v-layout>


            <v-card-title slot="header">
                <v-icon>panorama_fish_eye</v-icon>
                <h6 class="title">Vos produits et services</h6>
            </v-card-title>
            <my-product :user="user"/>
            <v-expansion-panel popout>
                <!--<v-expansion-panel-content key="mpr">-->
                    <!---->
                <!--</v-expansion-panel-content>-->
                <v-expansion-panel-content key="mba">
                    <v-card-title slot="header">
                        <v-tooltip bottom>
                            <v-layout align-center slot="activator">
                                <v-icon>shopping_basket</v-icon>
                                <h6 class="title">Paniers</h6>
                                <v-icon color="orange" small>new_releases</v-icon>
                            </v-layout>
                            <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
                        </v-tooltip>
                    </v-card-title>
                    <my-basket :user="user"/>
                </v-expansion-panel-content>
                <v-expansion-panel-content key="mpu">
                    <v-card-title slot="header">
                        <v-tooltip bottom>
                            <v-layout align-center slot="activator">
                                <v-icon>border_all</v-icon>
                                <h6 class="title">Puzzles</h6>
                                <v-icon color="orange" small>new_releases</v-icon>
                            </v-layout>
                            <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
                        </v-tooltip>
                    </v-card-title>
                    <my-puzzle :user="user"/>
                </v-expansion-panel-content>
                <v-expansion-panel-content key="mte">
                    <v-card-title slot="header">
                        <v-tooltip bottom>
                            <v-layout align-center slot="activator">
                                <v-icon>flag</v-icon>
                                <h6 class="title">Equipes</h6>
                                <v-icon color="orange" small>new_releases</v-icon>
                            </v-layout>
                            <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
                        </v-tooltip>
                    </v-card-title>
                    <my-team :user="user"/>
                </v-expansion-panel-content>
                <v-expansion-panel-content key="mme">
                    <v-card-title slot="header">
                        <v-icon>chat_bubble</v-icon>
                        <h6 class="title">Messages</h6>
                    </v-card-title>
                    <my-messages/>
                </v-expansion-panel-content>
            </v-expansion-panel>


        </v-flex>
    </v-container>
</template>

<script>
    import MyProduct from "./MyProduct"
    import OpenMessage from "../common/OpenMessage"
    import MyPuzzle from "./MyPuzzle"
    import MyTeam from "./MyTeam"
    import MyMessages from "./MyMessage"
    import {mapState} from "vuex"
    import MyBasket from "./MyBasket"
    import {GO} from "../../const/go"


    export default {
        components: {MyBasket, MyMessages, MyTeam, MyPuzzle, OpenMessage, MyProduct},
        data: () => ({GO}),
        computed: {
            ...mapState(['user']),
        }
    }
</script>