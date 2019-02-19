<template>
    <v-toolbar class="elevation-0">
        <slot name="left"></slot>
        <icon :icon-color="iconColor" :icon="icon" :icon-class="iconClass"/>
        <div :class="titleClass">{{title}}</div>
        <v-spacer></v-spacer>
        <slot name="right"></slot>
    </v-toolbar>
</template>

<script>
    import Icon from "../common/icon"

    export default {
        name: "subpage-title",
        components: {Icon},
        props: {
            title: String,
            iconClass: String,
            iconColor: {type: String, default: 'primary'},
            icon: String,
            sub: Boolean
        },
        computed: {
            titleClass() {
                return this.sub ?
                    'font-weight-thin title' :
                    "ma-3 display-1 font-weight-thin"
            }
        },
    }
</script>

<style scoped>

</style>