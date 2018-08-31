<template>
    <v-layout v-if="trunk" raw align-center :style="style" @click="$emit('nav')">
        <v-icon v-if="!noIcon" x-large :style="{color: trunk && trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
        <h2 align-center v-html="qtUnitName(trunk)"></h2>
        <v-spacer/>
    </v-layout>
</template>
<script>
    import {qtUnitName, shadeColor} from "../../services/calculations"

    export default {
        name: "tree-head",
        props: {"tree": Object, "bgColor": String, "noIcon": Boolean},
        methods: {
            qtUnitName, shadeColor
        },
        computed: {
            style: function(){
                return this.bgColor && {
                    backgroundColor:shadeColor(this.bgColor,0.8),
                    border:'1px',
                    borderStyle: 'solid',
                    borderColor:this.bgColor,
                    padding:"0.5em"
                }
            },
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>