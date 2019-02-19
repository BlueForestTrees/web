<template>
    <v-list-tile-avatar v-if="iconClass" :class="iconClass"/>
    <v-icon v-else-if="icon" x-large :color="iconColor">{{icon}}</v-icon>
</template>

<script>
    export default {
        name: "icon",
        props: {
            iconClass: String,
            iconColor: String,
            icon: String
        }
    }
</script>