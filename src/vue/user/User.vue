<template>
    <card>
        <subpage-title :title="user.fullname">
            <user-icon slot="left" :user="user"/>
        </subpage-title>

        <editor v-model="editing"
                :initial="initial" :changes="changes" :editor="editor" :editable="owned"
                @change="change"
        />

        <saver v-if="owned && !editing"
               :initial="initial" :changes="changes"
               :update-action="On.UPDATE_USER" updated-text="Utilisateur mis à jour."
               @saved="saved"
        />
    </card>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import UserIcon from "./UserIcon"
    import Editor from "../common/Editor"
    import Vue from 'vue'
    import Saver from "../editor/Saver"
    import On from "../../const/on"
    import Card from "../common/Card"
    import {formatDate} from "../../services/calculations"
    import {mapState} from "vuex"

    export default {
        name: "user",
        props: ['user'],
        components: {Card, Saver, Editor, UserIcon, SubpageTitle},
        data: () => ({
            editor: null,
            changes: null,
            editing: null,
            On
        }),
        created() {
            this.initEditor()
            this.initChanges()
        },
        computed: {
            ...mapState({loggedUser: s => s.user}),
            initial() {
                return this.user
            },
            owned() {
                return this.loggedUser && this.loggedUser._id === this.initial._id
            },
        },
        methods: {
            initEditor() {
                this.editor = [
                    {key: "description", title: "Description", editor: "textarea-editor"},
                    {key: "fullname", title: "Nom", editor: "textarea-editor"},
                    {key: "mail", title: "Adresse", noedit: true},
                    {key: "wantSuscribeDate", title: "Inscription", displayFct: formatDate, noedit: true},
                ]
            },
            initChanges() {
                this.changes = {_id: this.user._id}
            },
            change(field, newvalue) {
                if (field.value !== newvalue) {
                    if (newvalue !== undefined) {
                        Vue.set(this.changes, field.key, newvalue)
                    } else {
                        Vue.delete(this.changes, field.key)
                    }
                } else {
                    Vue.delete(this.changes, field.key)
                }
            },
            saved(changes) {
                Object.assign(this.user, changes)
                if (this.owned) {
                    Object.assign(this.loggedUser, changes)
                }
                this.initChanges()
            }
        }
    }
</script>