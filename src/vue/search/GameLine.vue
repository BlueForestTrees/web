<template>
    <v-list-tile :key="item._id" avatar @click="select(item)">
        <v-list-tile-action>
            <v-list-tile-avatar class="game logo-moyen"/>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Qui a le plus de {{item.fragmentName}}?</v-list-tile-title>
            <v-list-tile-sub-title>Avec {{ item.leftName }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-list-tile-action-text>{{deltaTime(item.date)}}</v-list-tile-action-text>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    import {deltaTime, qtUnit, name, treefy} from "../../services/calculations"
    import {QUI2} from "../../const/games"
    import {GO} from "../../const/go"

    export default {
        name: "trunk-line",
        props: {item: Object},
        methods: {
            qtUnit, name, deltaTime, treefy,
            select(item) {
                if (item.type === QUI2) {
                    this.$router.push({name: GO.GAME, params: {gameId: item._id}})
                }
            }
        }
    }
</script>