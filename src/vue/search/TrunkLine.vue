<template>
    <v-list-tile :key="item._id" avatar @click="$emit('select', treefy(item))">
        <v-list-tile-action>
            <v-list-tile-avatar class="trunk logo-petit"/>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>{{ name(item) }}</v-list-tile-title>
            <v-list-tile-sub-title>quantité: {{ qtUnit(item) }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="item.stores">Magasins: {{item.stores}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-list-tile-action-text>{{deltaTime(item.date)}}</v-list-tile-action-text>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    import {deltaTime, qtUnit, name, treefy} from "../../services/calculations"

    export default {
        name: "trunk-line",
        props: {item: Object},
        methods: {
            qtUnit, name, deltaTime, treefy,
        }
    }
</script>