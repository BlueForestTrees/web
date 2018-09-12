<template>
    <v-navigation-drawer fixed right clipped app v-model="nav.rightMenuVisible" width="400" style="overflow-y:hidden">

        <v-layout column align-center>
            <v-divider/>
            <v-btn icon absolute @click="nav.rightMenuVisible = false" style="right:0em">
                <v-icon>close</v-icon>
            </v-btn>
            <v-layout align-center my-2>
                <v-icon color="primary">question_answer</v-icon>
                <span class="subheading">Messages</span>
            </v-layout>
            <v-divider/>
        </v-layout>

        <v-container pa-2>
            <v-layout ref="messages" column style="overflow-y:scroll;height:500px">
                <template v-for="m in messages.list">
                    <span :key="m._id" style="background-color: #F2F9FE;border-radius:1em">
                        <v-flex ma-2><span style="color: #3F81CB;margin-right:1em">{{m.shortname}}</span>{{m.message}}</v-flex>
                    </span>
                    <v-flex ml-4 mb-2 class="caption"><span style="margin-bottom: 1em;margin-right:0.1em;color: #3F81CB">Répondre ·</span>{{deltaTime(m.creationDate)}}</v-flex>
                </template>
            </v-layout>
        </v-container>

        <v-divider/>
        <v-container ma-0 pa-0>
            <v-layout row align-center class="caption">
                <v-btn icon @click="sendMessage">
                    <v-icon :color="sendError ? 'red darken-2' : 'primary'">send</v-icon>
                </v-btn>
                <span v-if="sendError" style="color: darkred">Le message n'a pas été envoyé, réessayez</span></v-layout>
            <v-textarea @keydown.ctrl.enter="sendMessage" v-model="message" label="Votre message..." counter maxlength="1000" full-width></v-textarea>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import {createStringObjectId, deltaTime} from "../../services/calculations"

    export default {
        name: "right-menu",
        data() {
            return {
                message: null,
                sendError: false
            }
        },
        computed: {
            ...mapState(['messages', 'nav', 'user'])
        },
        methods: {
            deltaTime,
            ...mapActions({
                loadMessages: On.LOAD_MESSAGES,
                dispatchSendMessage: On.SEND_MESSAGE
            }),
            sendMessage() {
                const backup = this.message
                this.dispatchSendMessage({
                    _id: createStringObjectId(),
                    ...this.messages.filter,
                    message: backup,
                    creationDate: new Date(),
                    shortname: this.user.shortname || this.user.fullname
                }).then(() => {
                    this.$refs.messages.scrollTop = 999999999
                    this.sendError = false
                }).catch(() => {
                    this.message = backup
                    this.sendError = true
                })
                this.message = null
            }
        },
        watch: {
            "messages.filter": function (filter) {
                this.loadMessages(filter)
            }
        }
    }
</script>