<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <selection-picker :value="treeSelection" @pick="pickSelection"/>
    </v-dialog>
</template>

<script>
    import SelectionPicker from "../tree/SelectionPicker"

    export default {
        name: "SelectionDialog",
        components: {SelectionPicker},
    }
</script>

<style scoped>

</style>