<template>
    <v-list>
        <v-list-tile v-for="item in items" :key="qtUnitName(item)">
            <v-list-tile-content>{{qtUnitName(item, coef)}}</v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"

    export default {
        name: 'AxisList',
        props: {
            items: {type: Array},
            coef: {type:Number}
        },
        methods: {
            qtUnitName
        }
    }
</script>