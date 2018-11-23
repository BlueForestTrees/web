<template>
    <v-layout align-center v-if="trunk" @click="selectable && toggleSelect(tree)" :style="{background: isSelected(tree) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
        <photo v-if="photo" :trunk="trunk" size="100"/>

        <v-icon v-if="!noIcon && isSelected(tree)" x-large color="primary">check_circle</v-icon>
        <v-icon v-else-if="!noIcon" x-large :style="`color: ${color(tree)}`">panorama_fish_eye</v-icon>

        <span class="subheading" v-html="qtUnitName(tree)"></span>
    </v-layout>
</template>
<script>
    import {qtUnitName, color} from "../../services/calculations"
    import Photo from "../common/Photo"
    import selectable from "../mixin/Selectable"


    export default {
        name: "tree-head",
        mixins: [selectable],
        components: {Photo},
        props: {
            photo: {type: Boolean, default: true},
            tree: Object,
            noIcon: Boolean,
            selectable: {type: Boolean, default: false}
        },
        methods: {
            qtUnitName, color
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>