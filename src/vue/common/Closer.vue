<template>
    <v-btn icon @click.stop="$emit('close')">
        <v-icon color="grey" large>close</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "closer"
    }
</script>