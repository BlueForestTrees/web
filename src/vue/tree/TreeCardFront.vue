<template>
    <v-layout v-if="tree" column>
        <h1 class="display-2 align">{{qtUnit}}</h1>
        <h5 v-if="qtFreq" class="align font-weight-thin">{{qtFreq}}</h5>
        <h3 class="display-1 align font-weight-thin">{{name}}</h3>
    </v-layout>
</template>

<script>
    import {qtUnit, name, qtFreq} from "../../services/calculations"

    export default {
        name: "tree-card-front",
        props: {
            tree: Object,
        },
        computed: {
            qtUnit() {
                return qtUnit(this.tree)
            },
            qtFreq() {
                return qtFreq(this.tree.selection)
            },
            name() {
                return name(this.tree)
            }
        }
    }
</script>