<template>
    <v-flex class="no-wrap" v-if="item">
        {{ (quantity && quantity.qt) ? quantity.qt : 'qt?' }}{{ (quantity && quantity.unit) ? quantity.unit : 'unit?'}} {{ item.name }}
    </v-flex>
    <v-flex class="no-wrap" v-else-if="axis">
        {{format(axis.qt)}}{{axis.unit}} {{axis.axis}}
    </v-flex>
</template>

<script>


    import {format} from "../../services/calculations";

    export default {
        name: 'qt-unit-name',
        props: ['item', 'axis'],
        computed: {
            quantity: function () {
                return this.item.quantity;
            }
        },
        data: function () {
            return {
                format
            }
        }
    }
</script>