<template>
    <v-dialog :value="visible" @input="$emit('visibility', $event)" max-width="500px" @keydown.esc="$emit('visibility', false)" persistent>
        <v-card>
            <selection-picker :value="value" @pick="$emit('input', $event)" @close="$emit('visibility', false)"/>
        </v-card>
    </v-dialog>
</template>

<script>
    import SelectionPicker from "../tree/SelectionPicker"

    export default {
        name: "SelectionDialog",
        components: {SelectionPicker},
        props: ['value', 'visible']
    }
</script>

<style scoped>

</style>