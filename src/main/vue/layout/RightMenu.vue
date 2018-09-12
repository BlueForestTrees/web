<template>
    <v-navigation-drawer fixed right clipped app v-model="nav.rightMenuVisible">
        {{messages}}
        <v-btn icon dense @click="nav.rightMenuVisible = false">
            <v-icon>close</v-icon>
        </v-btn>
    </v-navigation-drawer>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "right-menu",
        computed: {
            ...mapState(['messages', 'nav'])
        }
    }
</script>