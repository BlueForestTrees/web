<template>
    <v-layout raw justify-center v-if="trunk" @click="$emit('nav')" style="margin-top:-2em">
        <v-icon x-large>{{icon}}</v-icon>
        <span style="margin-top:4.5em">
            <v-icon v-if="!noIcon" :style="{color: trunk && trunk.color || 0}">lens</v-icon>
            <span class="subheading" v-html="qtUnitName(trunk)"></span>
        </span>
    </v-layout>
</template>
<script>
    import {qtUnitName, shadeColor} from "../../services/calculations"

    export default {
        name: "tree-sub-head",
        props: {"tree": Object, "noIcon": Boolean, "icon":String},
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