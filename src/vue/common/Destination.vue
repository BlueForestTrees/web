<template>
    <v-list-tile v-if="tree" @click="$emit('click')">
        <v-icon x-large :style="{color: color(tree) || 0,marginRight:'0.2em'}">panorama_fish_eye</v-icon>
        <h3>{{noqt ? name(tree) : qtUnitName(tree)}}</h3>
    </v-list-tile>
</template>

<script>
    import {qtUnitName, name, color} from "../../services/calculations"

    export default {
        name: 'destination',
        props: {tree: Object, noqt: Boolean},
        methods: {qtUnitName, name, color}
    }
</script>