<template>
    <div id="app">
        <v-app >
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-app>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "app",
        computed: {
           ...mapState(['nav'])
        }
    }
</script>