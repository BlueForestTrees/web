<template>
    <v-select label="Grandeur..." item-text="label" required
              :items="getGrandeurs()" :value="value" @input="v => $emit('input',v)"
              :disabled="disabled"
              :rules="[required]"
    />
</template>

<script>
    import {getGrandeurs} from "trees-units";
    import {required} from "../../services/rules";

    export default {
        name: 'grandeur-select',
        props: ['value', 'disabled'],
        methods: {
            getGrandeurs, required
        }
    }
</script>