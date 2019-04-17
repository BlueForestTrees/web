<template>
    <v-card class="rounded-big">
        <v-layout row align-center justify-space-between>
            <v-btn disabled flat round class="pl-0 ml-0 text-none">
                <v-icon class="ml-3" color="grey">arrow_drop_down</v-icon>
                <span class="font-weight-thin">{{title}}</span>
            </v-btn>
            <slot/>
            <v-btn icon>
                <v-icon large color="grey" @click="$emit('close')">close</v-icon>
            </v-btn>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "Panel",
        props: ['title']
    }
</script>

<style scoped>

</style>