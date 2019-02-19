<template>
    <v-card class="ma-5">
        <subpage-title title="Consulté récemment" icon="schedule"/>
        <v-card-text v-if="emptyBasket" class="text-md-center"><br>Vous n'avez rien consulté récemment. <br><br>Faites une recherche pour trouver des choses intéressantes!</v-card-text>
        <span v-else>
            <span v-if="trunks.length">
                <v-container>
                    <h2 class="font-weight-thin">Produits et services:</h2>
                    <basket-comp :items="trunks" title="Produits et services:"/>
                </v-container>
                <v-divider/>
            </span>
            <span v-if="impacts.length">
                <v-container>
                    <h2 class="font-weight-thin">Environnement:</h2>
                    <basket-comp :items="impacts"/>
                </v-container>
                <v-divider/>
            </span>
            <span v-if="facets.length">
                <v-container>
                    <h2 class="font-weight-thin">Propriétés:</h2>
                    <basket-comp :items="facets"/>
                </v-container>
                <v-divider/>
            </span>
        </span>
    </v-card>
</template>
<script>
    import {mapActions} from "vuex"
    import {mapGetters} from "vuex"
    import BasketComp from "../basket/BasketComp"
    import On from "../../const/on"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "my-basket",
        components: {SubpageTitle, BasketComp},
        computed: {
            ...mapGetters({
                trunks: 'basketArray',
                impacts: 'basketImpactArray',
                facets: 'basketFacetArray',
                emptyBasket: 'emptyBasket'
            })
        },
        methods: {
            ...mapActions({goSearch: On.GO_SEARCH})
        }
    }
</script>