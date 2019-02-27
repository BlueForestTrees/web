<template>
        <v-layout column align-center>
            <v-layout align-center>
                <selection-card-front :selection="up && up.selection" no-selection="A"/>
                <div class="bold-font align display-2 ma-4">contient</div>
                <selection-card-front :selection="down && down.selection" no-selection="B"/>
            </v-layout>
            <v-btn icon @click="revert">
                <v-icon large>swap_horiz</v-icon>
            </v-btn>
        </v-layout>
</template>

<script>
    import Destination from "./Destination"
    import QtUnitName from "../tree/QtUnitName"
    import SelectionCardFront from "../tree/SelectionCardFront"

    export default {
        name: "order-picker",
        components: {SelectionCardFront, QtUnitName, Destination},
        props: ['up', 'down'],
        methods: {
            revert() {
                this.$emit('revert')
            }
        }
    }
</script>