<template>
    <v-layout row>
        <a href="https://youtube.com" target="_blank"><v-list-tile-avatar class="link-youtube hover-opaque hand"/></a>
        <a href="https://github.com/BlueForestTrees" target="_blank"><v-list-tile-avatar class="link-github hover-opaque hand"/></a>
        <a href="https://twitter.com/foret_bleue" target="_blank"><v-list-tile-avatar class="link-twitter hover-opaque hand"/></a>
        <a href="https://www.facebook.com/blueforesttrees" target="_blank"><v-list-tile-avatar class="link-facebook hover-opaque hand"/></a>
        <a href="https://www.linkedin.com/company/18549474" target="_blank"><v-list-tile-avatar class="link-linkedin hover-opaque hand"/></a>
        <a href="https://blueforest.slack.com/" target="_blank"><v-list-tile-avatar class="link-slack hover-opaque hand"/></a>
    </v-layout>
</template>

<script>
    import Icon from "../common/icon"
    export default {
        name: "LinksBar",
        components: {Icon}
    }
</script>

<style scoped>
.hover-opaque:hover{
    opacity: 0.6;
    transition: opacity .4s;
    -moz-transition: opacity .4s;
    -webkit-transition: opacity .4s;
    -o-transition: opacity .4s;
}
</style>