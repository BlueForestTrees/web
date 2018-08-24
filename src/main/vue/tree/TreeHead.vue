<template>
    <v-container v-if="trunk" :style="{backgroundColor:bgColor}">
        <v-layout raw align-center @click="$emit('nav')">

            <v-icon x-large :style="{color: trunk && trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
            <h2 v-html="qtUnitName(trunk)"></h2>

            <v-spacer/>

            <v-btn v-if="!noClose" icon flat @click="$emit('close')">
                <v-icon x-large color="grey">close</v-icon>
            </v-btn>

        </v-layout>
    </v-container>
</template>
<script>
    import {qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"

    export default {
        name: "tree-head",
        props: {"tree": Object, "bgColor": String, "noClose": Boolean},
        methods: {
            qtUnitName
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>