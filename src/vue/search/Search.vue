<template>
    <v-flex key="search">
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Recherche</span>
        </v-layout>
        <search-trunk/>
    </v-flex>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import SearchTrunk from "./SearchTrunk"

    export default {
        name: "search",
        components: {SearchTrunk},
        methods: {
            ...mapActions({
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG
            }),
        },
    }
</script>