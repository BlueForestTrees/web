<template>
    <v-container align>
        <v-layout column align-center>
            <selection-link :selection="selection"/>
            <h5 class="align font-weight-thin">{{qtFreq(selection)}}</h5>
            <transition-expand>
                <div v-if="attribute" class="font-weight-thin">Soit {{qtUnitName(attribute)}}</div>
            </transition-expand>
        </v-layout>
    </v-container>
</template>
<script>
    import {qtUnitName, qtFreq} from "../../services/calculations"
    import SelectionLink from "../pub/Selection-Link"
    import TransitionExpand from "../common/TransitionExpand"
    export default {
        components: {TransitionExpand, SelectionLink},
        props:['selection','attribute'],
        methods:{
            qtFreq, qtUnitName
        }
    }
</script>