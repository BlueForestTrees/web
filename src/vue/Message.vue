<template>
    <v-card>
        <v-btn flat icon @click="showErrorMessages">
            <v-icon color="primary">chat_bubble</v-icon>
            <span style="position:absolute;color:white;top:0.4em">{{count}}</span>
        </v-btn>
    </v-card>
</template>

<script>
    import On from "../const/on"
    import {mapActions} from "vuex"
    import {secs} from "../const/sections"

    export default {
        name: "message",
        data() {
            return {
                count: null
            }
        },
        mounted() {
            this.countMessages({type: secs.GLOBAL_APP}).then(c => this.count = c)
        },
        methods: {
            ...mapActions({
                showErrorMessages: On.SHOW_GLOBAL_MESSAGES,
                countMessages: On.COUNT_MESSAGES
            })
        }
    }
</script>