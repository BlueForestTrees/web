<template>
    <v-btn small flat round @click="$emit('click')" class="text-none">
        <v-icon color="grey">arrow_drop_down</v-icon>
        <span class="font-weight-thin">{{title}}</span>
    </v-btn>
</template>

<script>
    export default {
        name: "FilterBarBtn",
        props: ['title']
    }
</script>

<style scoped>

</style>