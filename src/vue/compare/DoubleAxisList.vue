<template>
    <v-flex>
        <v-layout column v-for="item in items" :key="item.left.name">
            <v-list-tile-title class="align">{{qtUnit(item.left, {coef:leftCoef})}} ⟵ {{name(item.left)}} ⟶ {{qtUnit(item.right, {coef:rightCoef})}}</v-list-tile-title>
            <compare-bar class="height-30 pb-2" :left="qt(item.left, leftCoef)" :right="qt(item.right, rightCoef)"/>
            <v-divider/>
        </v-layout>
    </v-flex>
</template>

<script>
    import {qtUnit, name, qt} from "../../services/calculations"
    import CompareBar from "./CompareBar"

    export default {
        name: "DoubleAxisList",
        components: {CompareBar},
        props: {
            items: {type: Array},
            leftCoef: {type: Number},
            rightCoef: {type: Number}
        },
        methods: {
            qt, qtUnit, name
        }
    }
</script>