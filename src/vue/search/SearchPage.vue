<template>
    <v-flex key="search-page" grid-list-md text-xs-center>
        <v-card>
            <welcome-panel/>
            <selection-command/>
        </v-card>
        <selection @select="goTree"/>
    </v-flex>
</template>

<script>
    import Selection from "../basket/Selection"
    import SelectionCommand from "../basket/SelectionCommand"
    import WelcomePanel from "./WelcomePanel"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "search-page",
        components: {WelcomePanel, SelectionCommand, Selection},
        methods: {
            ...mapActions({goTree: On.GO_ANY})
        }
    }
</script>