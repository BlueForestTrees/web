<template>
    <v-list-tile v-if="tree" @click="$emit('click')">
        <v-icon x-large :style="{color: tree.trunk && tree.trunk.color || 0,marginRight:'0.2em'}">panorama_fish_eye</v-icon>
        <h3 v-if="tree.trunk">{{noqt ? tree.trunk.name : qtUnitName(tree.trunk)}}</h3>
    </v-list-tile>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: 'destination',
        props: {tree: Object, noqt: Boolean},
        methods: {qtUnitName}
    }
</script>