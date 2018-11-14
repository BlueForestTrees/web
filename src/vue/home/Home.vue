<template>
    <v-container>
        <v-flex mt-3>

            <v-layout align-center ma-2>
                <v-icon color="orange" large>new_releases</v-icon>
                <v-layout column mx-2>
                    <span>Cette icône indique une fonction en cours de développement ou à l'étude.</span>
                    <span> Retrouvez-les toutes et donnez votre avis dans la section « <router-link :to="{name:GO.ROAD_MAP}"><v-icon color="primary">chrome_reader_mode</v-icon>Fonctions à venir »</router-link> du menu de gauche</span>
                </v-layout>
            </v-layout>

            <my-product :user="user"/>

            <my-basket :user="user"/>

            <my-puzzle :user="user"/>

            <my-team :user="user"/>

            <my-messages/>

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