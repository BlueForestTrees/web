<template>
    <v-flex class="no-wrap">
        {{value}}
    </v-flex>
</template>

<script>
    import {qtUnitName} from "../../services/calculations";

    export default {
        name: 'qt-unit-name-label',
        props: ['item'],
        computed: {
            value: function () {
                return qtUnitName(this.item);
            }
        }
    }
</script>