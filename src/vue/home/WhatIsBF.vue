<template>
    <v-card>
        <v-card-title>
            <v-icon color="primary" class="mr-4">live_help</v-icon>
            Présentation
        </v-card-title>
        <v-divider/>

        <v-list-tile @click="$router.push({name: PLAN_INTRO})">
            <v-list-tile-content>
                <v-list-tile-title>BlueForest: c'est quoi?</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

    </v-card>
</template>

<script>
    import {GO} from "../../const/go"

    export default {
        name: "what-is",
        data() {
            return {
                PLAN_INTRO: GO.PLAN_INTRO
            }
        }
    }
</script>