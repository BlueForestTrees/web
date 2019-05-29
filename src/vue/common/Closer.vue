<template>
    <v-btn icon @click.stop="$emit('close')">
        <v-icon color="grey">{{previous ? 'arrow_back' : 'close'}}</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "closer",
        props: {previous: {type: Boolean, default: false}}
    }
</script>