<template>
    <v-flex @click="showMessages" class="hand">
        <v-card-title>
            <h3 class="font-weight-medium">{{this.section.title}}</h3>
            <v-btn flat icon>
                <v-icon color="primary">chat_bubble</v-icon>
                <span style="position:absolute;color:white;top:0em">{{count}}</span>
            </v-btn>
        </v-card-title>
    </v-flex>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {secs} from "../../const/sections"

    export default {
        name: "open-message",
        props: ['section'],
        data() {
            return {
                count: null
            }
        },
        mounted() {
            this.countMessages(this.section.filter).then(c => this.count = c)
        },
        methods: {
            showMessages() {
                this.dispatchShowMessages(this.section)
            },
            ...mapActions({
                dispatchShowMessages: On.SHOW_MESSAGES,
                countMessages: On.COUNT_MESSAGES
            })
        }
    }
</script>