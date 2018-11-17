<template>
    <v-flex key="basket">
        <v-layout row wrap justify-center align-center class="ma-4">
            <v-icon color="blue">select_all</v-icon>
            <span class="title">Mes produits</span>
        </v-layout>
        <v-divider/>

        <v-card-title slot="header">
            <h6 class="title">Sélection courante</h6>
        </v-card-title>
        <v-card-text v-if="emptyBasket" class="text-md-center">Rien est sélectionné. <br>Faites une <span><v-icon @click="goSearch" color="primary">search</v-icon> recherche pour trouver des choses intéressantes!</span></v-card-text>

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


        <v-card-title slot="header">
            <h6 class="title">Vos produits et services</h6>
        </v-card-title>
        <my-product :user="user"/>

        <v-card-title slot="header">
            <v-tooltip bottom>
                <v-layout align-center slot="activator">
                    <h6 class="title">Vos sélections enregistrées</h6>
                    <v-icon color="orange" small>new_releases</v-icon>
                </v-layout>
                <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
            </v-tooltip>
        </v-card-title>
        <my-basket :user="user"/>


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


        <!--<v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">-->
            <!--<v-btn color="primary" flat value="recent">-->
                <!--<span>Recent</span>-->
                <!--<v-icon>history</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn color="primary" flat value="favorites">-->
                <!--<span>Favorites</span>-->
                <!--<v-icon>favorite</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn color="primary" flat value="nearby">-->
                <!--<span>Nearby</span>-->
                <!--<v-icon>place</v-icon>-->
            <!--</v-btn>-->
        <!--</v-bottom-nav>-->

    </v-flex>
</template>

<script>
    import BasketComp from "./BasketComp"
    import {mapGetters, mapActions} from "vuex"
    import On from "../../const/on"
    import {mapState} from "vuex"
    import MyProduct from "../home/MyProduct"
    import MyBasket from "../home/MyBasket"
    import MyPuzzle from "../home/MyPuzzle"

    export default {
        name: 'selection',
        components: {MyPuzzle, MyBasket, MyProduct, BasketComp},
        data: () => ({bottomNav: null}),
        computed: {
            ...mapGetters({
                trunks: 'basketArray',
                impacts: 'basketImpactArray',
                damages: 'basketDamageArray',
                facets: 'basketFacetArray',
                emptyBasket: 'emptyBasket'
            }),
            ...mapState(['user'])
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