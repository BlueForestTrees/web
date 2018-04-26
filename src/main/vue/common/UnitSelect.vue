<template>
    <v-select label="Unité..." item-text="name" required
              :items="items" :value="value" @input="v => $emit('input',v)"
    />
</template>

<script>
    import {getUnits} from "trees-units";

    export default {
        name: 'unit-select',
        props: ['value', 'grandeur'],
        computed: {
            items: function () {
                return this.grandeur && this.grandeur.units || Object.values(getUnits())
            }
        }
    }
</script>