<template>
    <v-tabs centered :value="value" icons-and-text>
        <v-tab class="logo-big planet" @click="$emit('input', 0)"/>
        <v-tab class="logo-big ressource" @click="$emit('input', 1)"/>
        <v-tab class="logo-big facet" @click="$emit('input', 2)"/>
    </v-tabs>
</template>

<script>
    export default {
        name: "fragment-select",
        props:['value']
    }
</script>