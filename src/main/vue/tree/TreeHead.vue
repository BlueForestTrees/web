<template>
    <v-layout raw align-center v-if="trunk" @click="$emit('nav')">
        <v-icon v-if="!noIcon" x-large :style="{color: trunk && trunk.color || 0}">lens</v-icon>
        <h3 v-html="qtUnitName(trunk)"></h3>
    </v-layout>
</template>
<script>
    import {qtUnitName, shadeColor} from "../../services/calculations"

    export default {
        name: "tree-head",
        props: {"tree": Object, "noIcon": Boolean},
        methods: {
            qtUnitName, shadeColor
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>