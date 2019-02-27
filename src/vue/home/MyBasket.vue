<template>
    <v-card class="ma-5">
        <subpage-title title="Consulté récemment" icon="schedule"/>
        <v-card-text v-if="!basket.length" class="text-md-center"><br>Vous n'avez rien consulté récemment. <br><br>Faites une recherche pour trouver des choses intéressantes!</v-card-text>
        <div v-else>
            {{basket}}
        </div>
    </v-card>
</template>
<script>
    import {mapActions, mapState} from "vuex"
    import BasketComp from "../basket/BasketComp"
    import On from "../../const/on"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "my-basket",
        components: {SubpageTitle, BasketComp},
        computed: {
            ...mapState(['basket'])
        },
        methods: {
            ...mapActions({goSearch: On.GO_SEARCH})
        }
    }
</script>