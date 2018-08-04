<template>
    <v-container>
        <v-layout raw align-center v-if="tree">
                <v-icon x-large :style="{color: tree.trunk && tree.trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
                <h2 v-html="qtUnitName(tree.trunk)"></h2>
        </v-layout>
    </v-container>
</template>
<script>
    import {qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "tree-head",
        props: ["tree"],
        methods: {
            qtUnitName,
            ...mapActions({close:On.GO_HOME}),
        }
    }
</script>