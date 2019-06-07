<template>
    <v-toolbar @click="$emit('click')" class="elevation-0" :color="color || 'whitegrey'" :dark="color==='primary'">

        <v-spacer v-if="centered"/>
        <slot name="left"></slot>
        <icon :icon-color="iconColor" :icon="icon" :icon-class="iconClass"/>

        <h3 :class="titleClass"><slot name="middle">{{title}}</slot></h3>
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
            centered: {type: Boolean, default: false},
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