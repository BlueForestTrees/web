<template>
    <v-layout raw align-center v-if="trunk" :style="style" @click="$emit('nav')">
        <v-icon v-if="!noIcon" x-large :style="{color: trunk && trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
        <h2 v-html="qtUnitName(trunk)"></h2>
        <v-spacer/>
        <v-btn v-if="!noClose" icon flat @click="$emit('close')">
            <v-icon x-large color="grey">close</v-icon>
        </v-btn>
    </v-layout>
</template>
<script>
    import {qtUnitName, shadeColor} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"

    export default {
        name: "tree-head",
        props: {"tree": Object, "bgColor": String, "noClose": Boolean, "noIcon": Boolean},
        methods: {
            qtUnitName, shadeColor
        },
        computed: {
            style: function(){
                return {
                    backgroundColor:shadeColor(this.bgColor,0.7),
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