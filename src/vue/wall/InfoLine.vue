<template>
    <v-list-tile :key="item._id" avatar @click="$emit('select', item)">
        <v-list-tile-action>
            <v-list-tile-avatar class="voice logo-moyen"/>
        </v-list-tile-action>
        <v-list-tile-content>
            <info-dense :info="item"/>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-list-tile-action-text>{{deltaTime(item.date)}}</v-list-tile-action-text>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    import {deltaTime, qtUnit, name, treefy} from "../../services/calculations"
    import InfoDense from "../home/InfoDense"

    export default {
        name: "trunk-line",
        components: {InfoDense},
        props: {item: Object},
        methods: {
            qtUnit, name, deltaTime, treefy,
        }
    }
</script>