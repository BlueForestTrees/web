<template>
    <v-layout align-center v-if="trunk" @click="$emit('nav')">
        <v-layout column>
            <v-icon x-large>{{icon}}</v-icon>
            <v-icon v-if="!noIcon" :style="{color: trunk && trunk.color || 0}">lens</v-icon>
            <span class="subheading" v-html="qtUnitName(trunk)" style="position:relative"></span>
        </v-layout>
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