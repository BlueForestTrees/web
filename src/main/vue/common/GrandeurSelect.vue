<template>
    <v-select label="Grandeur..." item-text="label" required
              :items="getGrandeurs()" :value="value" @input="v => $emit('input',v)"
              :disabled="disabled"
    />
</template>

<script>
    import {getGrandeurs} from "trees-units";

    export default {
        name: 'grandeur-select',
        props: ['value', 'disabled'],
        methods: {
            getGrandeurs
        }
    }
</script>