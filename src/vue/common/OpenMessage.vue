<template>
    <v-flex @click="showMessages" class="hand">
        <v-card-title>
            <v-btn flat icon>
                <v-icon color="primary">chat_bubble</v-icon>
            </v-btn>
            <h3 class="font-weight-thin">{{section.title}}</h3>
        </v-card-title>
    </v-flex>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {secs} from "../../const/sections"

    export default {
        name: "open-message",
        props: {section: {type: Object}, showCount: false},
        methods: {
            showMessages() {
                this.dispatchShowMessages(this.section)
            },
            ...mapActions({
                dispatchShowMessages: On.SHOW_MESSAGES
            })
        }
    }
</script>