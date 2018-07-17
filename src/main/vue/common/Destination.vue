<template>
    <v-list-tile v-if="tree">
        <v-icon x-large :style="{color: tree.trunk && tree.trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
        <h3 v-if="tree.trunk">{{qtUnitName(tree.trunk)}}</h3>
    </v-list-tile>
</template>

<script>
    import {qtUnitName} from "../../services/calculations";

    export default {
        name: 'destination',
        props: ['tree'],
        methods: {qtUnitName}
    }
</script>