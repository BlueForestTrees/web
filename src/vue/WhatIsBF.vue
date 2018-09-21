<template>
    <v-card>
        <v-card-title>Présentation</v-card-title>
        <v-divider/>
        <v-list-tile @click="$router.push({name: PLAN_INTRO})">
            <v-list-tile-action>
                <v-icon color="primary">live_help</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>BlueForest: c'est quoi?</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

    </v-card>
</template>

<script>
    import SearchComp from "./SearchComp"
    import {GO} from "../const/go"

    export default {
        name: "what-is",
        components: {SearchComp},
        data() {
            return {
                PLAN_INTRO: GO.PLAN_INTRO
            }
        }
    }
</script>