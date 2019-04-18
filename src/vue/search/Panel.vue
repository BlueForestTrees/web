<template>
    <v-card class="rounded-big panel-height elevation-4">
        <v-layout row>
            <slot name="left"/>

            <v-layout row align-center justify-center class="panel-height">
                <slot/>
            </v-layout>

            <v-btn icon style="margin-top: 15px">
                <v-icon large color="grey darken-2" @click="$emit('close')">close</v-icon>
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