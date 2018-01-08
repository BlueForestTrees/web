<template>
    <span>
    <v-icon v-if="state == 'little-hover'">done</v-icon>
    <v-icon v-if="state == 'big-hover'">done</v-icon>
    <v-icon v-if="state == 'selected'">done</v-icon>
    <v-icon v-if="state == 'other'">panorama_fish_eye</v-icon>

    <v-icon>check_circle</v-icon>
    <v-icon>check_circle</v-icon>
    <v-icon>check_circle</v-icon>
    <v-icon>panorama_fish_eye</v-icon>
    </span>
</template>
<script>
    export default {
        props: ['state']
    }
</script>