<template>
    <v-card class="rounded-big">
        <v-layout row align-center justify-space-between>
            <slot name="left"/>
            <slot/>
            <v-btn icon>
                <v-icon large color="grey" @click="$emit('close')">close</v-icon>
            </v-btn>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "Panel"
    }
</script>

<style scoped>

</style>