<template>
    <div id="app">
        <v-app light>
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>