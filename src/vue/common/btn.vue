<template>
    <v-btn icon :disabled="!enabled" @click="$emit('click')">
        <icon :icon-color="iconColor" :icon="icon" :icon-class="clazz"/>
    </v-btn>
</template>

<script>
    import Icon from "./icon"

    export default {
        name: "btn",
        components: {Icon},
        props: {
            iconClass: String,
            iconColor: String,
            icon: String,
            enabled: {default: true}
        },
        computed: {
            clazz() {
                return (this.iconClass || '') + ((!this.enabled || '') && ' disabled')
            }
        }
    }
</script>

<style scoped>

</style>