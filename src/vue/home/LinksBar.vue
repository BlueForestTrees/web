<template>
    <v-layout row>
        <a href="https://www.youtube.com/channel/UCgoi19-rWSmHz0nvn3hplAg" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-youtube hover-opaque hand logo"/></a>
        <a href="https://github.com/BlueForestTrees" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-github hover-opaque hand logo"/></a>
        <a href="https://twitter.com/foret_bleue" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-twitter hover-opaque hand logo"/></a>
        <a href="https://www.facebook.com/blueforesttrees" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-facebook hover-opaque hand logo"/></a>
        <a href="https://www.linkedin.com/company/18549474" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-linkedin hover-opaque hand logo"/></a>
        <a href="https://blueforest.slack.com/" target="_blank" class="logo mr-2 ml-1"><v-list-tile-avatar class="link-slack hover-opaque hand logo"/></a>
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