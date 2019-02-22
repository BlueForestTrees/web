<template>
    <closer v-if="editing" @close="$emit('close')"/>
    <v-btn v-else icon @click="$emit('edit')">
        <v-icon color="primary">edit</v-icon>
    </v-btn>
</template>

<script>
    import Closer from "./Closer"

    export default {
        name: "close-edit-btn",
        components: {Closer},
        props: ['editing']
    }
</script>

<style scoped>

</style>