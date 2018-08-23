<template>
    <v-card>
        <v-container v-if="trunk">
            <v-layout raw align-center>
                <v-icon x-large :style="{color: trunk && trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
                <h2 v-html="qtUnitName(trunk)"></h2>
                <v-spacer/>
                <v-btn icon flat @click="close">
                    <v-icon x-large color="grey">close</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
    import {qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"

    export default {
        name: "tree-head",
        props: ["tree"],
        methods: {
            qtUnitName,
            ...mapActions({close: On.GO_HOME}),
        },
        computed: {
            trunk: function () {
                return this.tree && this.tree.trunk
            }
        }
    }
</script>