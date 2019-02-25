<template>
    <v-layout column align-center>
        <template v-if="selection">
            <selection-link :selection="selection"/>
            <h5 class="align font-weight-thin">{{qtFreq(selection)}}</h5>
        </template>
        <v-flex v-else class="bold-font display-2 mx-3">{{noSelection}}</v-flex>
        <transition-expand>
            <div v-if="attribute" class="font-weight-thin">Soit {{qtUnitName(attribute)}}</div>
        </transition-expand>
    </v-layout>
</template>
<script>
    import {qtUnitName, qtFreq} from "../../services/calculations"
    import SelectionLink from "../pub/Selection-Link"
    import TransitionExpand from "../common/TransitionExpand"

    export default {
        components: {TransitionExpand, SelectionLink},
        props: ['selection', 'attribute', 'noSelection'],
        methods: {
            qtFreq, qtUnitName
        }
    }
</script>