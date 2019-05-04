<template>
    <v-app id="app" :light="!nav.dark" :dark="nav.dark">
        <transition name="slide-fade-simple" mode="out-in">
            <t-play v-if="showIntro" @end="introEnd"/>
            <transition v-else name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </transition>
    </v-app>
</template>

<script>
    import {mapState} from "vuex"
    import TPlay from "./Play"

    export default {
        name: "app",
        components: {TPlay},
        computed: {
            ...mapState(['nav']),
            showIntro() {
                return this.nav.intro && this.$router.currentRoute.path === "/"
            }
        },
        methods: {
            introEnd() {
                this.nav.intro = false
            }
        }
    }
</script>