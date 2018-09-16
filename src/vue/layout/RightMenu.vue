<template>
    <v-navigation-drawer fixed right temporary v-model="nav.rightMenuVisible" width="400" style="overflow-y:hidden;display:flex;flex-direction:column;justify-content: space-between">

        <v-flex pa-2 style="flex:0 1 auto">
            <v-btn icon absolute @click="nav.rightMenuVisible = false" style="right:1em">
                <v-icon>close</v-icon>
            </v-btn>
            <v-layout align-center my-2>
                <span style="margin-left:1em;margin-right:1em">
                    <v-icon color="primary">chat_bubble</v-icon>
                </span>
                <span class="subheading">{{messages.title}}</span>
            </v-layout>
            <v-divider/>
        </v-flex>


        <span ref="messages" style="overflow-x:hidden;overflow-y:scroll;flex:1 1 auto">
            <v-layout ref="messages" column mx-2>
                <template v-for="m in messages.list">
                    <v-flex mt-3 :key="m._id" style="background-color: #F2F9FE;border-radius:1em;word-wrap: break-word;">
                        <v-flex ma-2><a class="body-1" style="font-weight:bold;color: #3F81CB;margin-right:1em;">{{m.shortname}}</a>{{m.message}}</v-flex>
                    </v-flex>
                    <v-flex ml-5 class="caption" style="color: #3F81CB">
                        <a @click="respondMessage(m)">Répondre · </a>
                        <a v-if="m.oid === user._id" @click="editMessage(m)">Modifier ·</a>
                        <a v-if="m.oid === user._id" @click="dispatchDeleteMessage(m)">Supprimer ·</a>
                        {{deltaTime(m.modifDate || m.creationDate)}}
                    </v-flex>
                    <template v-for="r in m.replies">
                        <div :key="r._id" style="background-color: #FFF2F2;border-radius:1em;word-wrap: break-word;margin-left:2em;margin-top:0.5em">
                            <v-flex ma-2><a class="body-1" style="font-weight:bold;color: #3F81CB;margin-right:1em;">{{r.shortname}}</a>{{r.message}}</v-flex>
                        </div>
                        <v-flex class="caption" style="color: #3F81CB;margin-left:7em">
                            <a v-if="r.oid === user._id" @click="editReply(r)">Modifier ·</a>
                            <a v-if="r.oid === user._id" @click="dispatchDeleteReply(r)">Supprimer ·</a>
                            {{deltaTime(r.modifDate || r.creationDate)}}
                        </v-flex>
                    </template>
                </template>
                <infinite-loading ref="iloading" @infinite="moreMessages" v-if="messages.hasMore" spinner="spiral" :distance="500" style="padding-bottom: 3em">
                    <span slot="no-more"></span>
                    <span slot="no-results"></span>
                </infinite-loading>
            </v-layout>
        </span>


        <span style="flex:0 1 auto">
            <v-divider/>
                <v-layout row>
                    <v-textarea ref="editor" style="margin-top:1em" :error-messages="errorMessages" height="2em" auto-grow @keydown.ctrl.enter="sendMessage" @keydown.esc.stop.native="cancelAny" v-model="message" :label="editorLabel" maxlength="1000" full-width></v-textarea>
                    <v-layout column ma-1>
                        <v-icon color="primary" @click="sendMessage">send</v-icon>
                        <v-icon v-if="editMsg || respondMsg" color="grey" large @click="cancelAny">close</v-icon>
                    </v-layout>
            </v-layout>
        </span>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import {createStringObjectId, deltaTime} from "../../services/calculations"
    import InfiniteLoading from 'vue-infinite-loading'
    import debounce from 'lodash.debounce'

    export default {
        name: "right-menu",
        components: {InfiniteLoading},
        data() {
            return {
                message: null,
                errorMessages: [],
                editMsg: null,
                editRep: null,
                respondMsg: null
            }
        },
        computed: {
            ...mapState(['messages', 'nav', 'user']),
            editorLabel() {
                if (this.respondMsg) {
                    return `Répondre à ${this.respondMsg.shortname}...`
                } else if (this.editMsg) {
                    return "Modifier votre message..."
                } else {
                    return "Votre message..."
                }
            }
        },
        methods: {
            deltaTime,
            ...mapActions({
                loadMessages: On.LOAD_MESSAGES,
                dispatchSendMessage: On.SEND_MESSAGE,
                dispatchUpdateMessage: On.UPDATE_MESSAGE,
                dispatchUpdateReply: On.UPDATE_REPLY,
                dispatchRespondMessage: On.RESPOND_MESSAGE,
                dispatchDeleteMessage: On.DELETE_MESSAGE,
                dispatchDeleteReply: On.DELETE_REPLY,
            }),
            moreMessages: debounce(function ($state) {
                if (this.messages.list.length > 0) {//on place aid si on a déjà chargé des messages, pour la pagination.
                    this.messages.filter.aid = this.messages.list[this.messages.list.length - 1]._id
                } else {
                    this.messages.filter.aid = null
                }
                this.loadMessages(this.messages.filter)
                    .then(() => $state && (this.messages.hasMore ? $state.loaded() : $state.complete()))
                    .then(() => !this.messages.hasMore && this.poll($state))
            }, 400),
            poll($state) {
                if (this.nav.rightMenuVisible) {
                    setTimeout(() => {
                        $state.reset()
                        this.messages.hasMore = true
                    }, 10000)
                }
            },
            cancelAny() {
                this.message = this.editMsg = this.respondMsg = null
            },
            respondMessage(m) {
                this.editMsg = null
                this.respondMsg = m
                this.editRep = null
                this.message = null
                this.$refs.editor.focus()
            },
            editMessage(m) {
                this.respondMsg = null
                this.editMsg = m
                this.editRep = null
                this.message = m.message
                this.$refs.editor.focus()
            },
            editReply(r) {
                this.respondMsg = null
                this.editMsg = null
                this.editRep = r
                this.message = r.message
                this.$refs.editor.focus()
            },
            sendMessage() {
                const backup = this.message
                if (this.editRep) {
                    this.dispatchUpdateReply({
                        _id: this.editRep._id,
                        msgId: this.editRep.msgId,
                        message: backup,
                    }).then(() => {
                        this.errorMessages = []
                        this.editRep = null
                    }).catch(() => {
                        this.message = backup
                        this.errorMessages = ['Le message n\'a pas été mis à jour, réessayez']
                    })
                } else if (this.editMsg) {
                    this.dispatchUpdateMessage({
                        _id: this.editMsg._id,
                        message: backup,
                    }).then(() => {
                        this.errorMessages = []
                        this.editMsg = null
                    }).catch(() => {
                        this.message = backup
                        this.errorMessages = ['Le message n\'a pas été mis à jour, réessayez']
                    })
                } else if (this.respondMsg) {
                    this.dispatchRespondMessage({
                        _id: createStringObjectId(),
                        msgId: this.respondMsg._id,
                        message: backup
                    }).then(() => {
                        this.errorMessages = []
                        this.respondMsg = null
                    }).catch(() => {
                        this.message = backup
                        this.errorMessages = ['La réponse n\'a pas été envoyée, réessayez']
                    })
                } else {
                    this.dispatchSendMessage({
                        _id: createStringObjectId(),
                        ...this.messages.filter,
                        message: backup,
                    }).then(() => {
                        this.$refs.messages.scrollTop = 999999999
                        this.errorMessages = []
                    }).catch(() => {
                        this.message = backup
                        this.errorMessages = ['Le message n\'a pas été envoyé, réessayez']
                    })
                }
                this.message = null
            }
        }
    }
</script>

<style>
    .v-navigation-drawer {
        padding-bottom: 0em
    }
</style>