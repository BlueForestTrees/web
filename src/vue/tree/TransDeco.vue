<template>
    <v-layout row align-center>
        <img :src="icon" width="48" height="48"/>
        <v-flex pl-2>{{qtUnit({bqt:trans.relativeTo.bqt, g:"Long"})}}</v-flex>
    </v-layout>
</template>

<script>

    import {qtUnit} from "../../services/calculations"

    export default {
        name: "trans-deco",
        props: ['trans'],
        methods: {
            qtUnit
        },
        computed: {
            icon() {
                if (this.trans.trunk.name.match(/^.*vraquier|batea.*$/)) {
                    return "/img/bateau.svg"
                } else if (this.trans.trunk.name.match(/^.*aérien.*$/)) {
                    return "/img/avion.svg"
                } else if (this.trans.trunk.name.match(/^.*ferro|train.*$/)) {
                    return "/img/train.svg"
                } else if (this.trans.trunk.name.match(/^.*camion|truck.*$/)) {
                    return "/img/camion.svg"
                }
            }
        }
    }
</script>