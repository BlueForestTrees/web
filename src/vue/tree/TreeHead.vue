<template>
    <v-layout raw align-center v-if="trunk" @click="$emit('nav')">
        <photo v-if="photo" :trunk="trunk" size="100"/>
        <v-icon v-if="!noIcon" x-large :style="{color: trunk && trunk.color || 0}">panorama_fish_eye</v-icon>
        <span class="subheading" v-html="qtUnitName(trunk)"></span>
    </v-layout>
</template>
<script>
    import {qtUnitName, shadeColor} from "../../services/calculations"
    import Photo from "../common/Photo"

    export default {
        name: "tree-head",
        components: {Photo},
        props: {photo: {type: Boolean, default: true}, "tree": Object, "noIcon": Boolean},
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