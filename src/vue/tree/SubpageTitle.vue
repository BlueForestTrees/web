<template>
    <v-toolbar class="elevation-0" :color="color || 'whitegrey'" :dark="color==='primary'">
        <slot name="left"></slot>
        <icon :icon-color="iconColor" :icon="icon" :icon-class="iconClass"/>
        <v-toolbar-title :class="titleClass"><slot name="middle">{{title}}</slot></v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="right"></slot>
    </v-toolbar>
</template>

<script>
    import Icon from "../common/icon"
    import Closer from "../common/Closer"

    export default {
        name: "subpage-title",
        components: {Closer, Icon},
        props: {
            color: String,
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