<template>
    <v-layout row align-center>
        <div class="ma-3 display-1 font-weight-thin">{{title}}</div>
        <v-spacer></v-spacer>
        <slot></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "SubpageTitle",
        props:["title"]
    }
</script>

<style scoped>

</style>