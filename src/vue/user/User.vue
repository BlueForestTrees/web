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
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :update-action="On.UPDATE_USER" updated-text="Utilisateur mis à jour."
               copy-forbidden delete-forbidden
               @saved="saved"
        />
    </card>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import UserIcon from "./UserIcon"
    import Editor from "../common/Editor"
    import Saver from "../editor/Saver"
    import On from "../../const/on"
    import Card from "../common/Card"
    import {formatDate} from "../../services/calculations"
    import {mapState} from "vuex"
    import Edition from "../editor/Edition"

    export default {
        name: "user",
        props: ['user'],
        mixins: [Edition],
        components: {Card, Saver, Editor, UserIcon, SubpageTitle},
        data: () => ({On}),
        created() {
            this.initial = this.user
            this.change({key: "_id"}, this.initial._id)
        },
        computed: {
            ...mapState({loggedUser: s => s.user}),
            owned() {
                return this.loggedUser && this.loggedUser._id === this.initial._id
            },
            editor() {
                return [
                    {key: "description", title: "Statut", editor: "textarea-editor"},
                    {key: "fullname", title: "Nom", editor: "textarea-editor"},
                    {key: "mail", title: "Adresse", noedit: true},
                    {key: "wantSuscribeDate", title: "Inscription", displayFct: formatDate, noedit: true},
                ]
            }
        },
        methods: {
            onSaved() {
                if (this.owned) {
                    Object.assign(this.loggedUser, this.initial)
                }
            }
        }
    }
</script>