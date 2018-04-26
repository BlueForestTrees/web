<template>
    <v-select label="Grandeur..." item-text="label" required
              :items="items" :value="value" @input="v => $emit('input',v)"
    />
</template>

<script>
    import {getGrandeurs} from "trees-units";

    export default {
        name: 'grandeur-select',
        props: ['value'],
        data: function () {
            return {
                items: getGrandeurs()
            }
        }
    }
</script>