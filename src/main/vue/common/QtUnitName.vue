<template>
    <v-flex class="no-wrap" v-if="item">
        <qt-unit :quantity="quantity"/> {{ item.name }}
    </v-flex>
    <v-flex class="no-wrap" v-else-if="axis">
        <qt-unit :quantity="axis"/> {{axis.axis}}
    </v-flex>
</template>

<script>


    import {format} from "../../services/calculations";
    import QtUnit from "./QtUnit";

    export default {
        components: {QtUnit},
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