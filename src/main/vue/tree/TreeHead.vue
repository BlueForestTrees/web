<template>
    <v-list v-if="tree">
        <v-list-tile>
            <v-icon x-large :style="{color: tree.trunk && tree.trunk.color || 0,marginRight:'0.2em'}">lens</v-icon>
            <h3 v-if="tree.trunk">{{qtUnitName(tree.trunk)}}</h3>
            <v-spacer/>
            <v-btn icon flat @click="close">
                <v-icon x-large color="grey">close</v-icon>
            </v-btn>
        </v-list-tile>
    </v-list>
    <span v-else>
        fsqdfsdf
    </span>
</template>
<script>
    import {qtUnitName} from "../../services/calculations";
    import {GO} from "../../const/go";

    export default {
        name: "tree-head",
        props: ["tree"],
        methods: {
            qtUnitName,
            close: function () {
                this.$router.push({name:GO.ROOT});
            }
        }
    }
</script>