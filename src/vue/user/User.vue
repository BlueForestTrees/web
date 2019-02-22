<template>
    <card>
        <subpage-title :title="user.fullname">
            <user-icon slot="left" :user="user"/>
        </subpage-title>
        <viewer-editor v-model="editing" :fields="fields" @change="change" :editable="owned"/>
        <saver v-if="owned && !editing" :changes="changes" :update-action="On.UPDATE_USER" @saved="saved" updated-text="Utilisateur mis à jour."/>
    </card>
</template>

<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import UserIcon from "./UserIcon"
    import ViewerEditor from "../common/ViewerEditor"
    import Vue from 'vue'
    import Saver from "../editor/Saver"
    import On from "../../const/on"
    import {mapState} from "vuex"
    import Card from "../common/Card"

    export default {
        name: "user",
        props: ['user'],
        components: {Card, Saver, ViewerEditor, UserIcon, SubpageTitle},
        data: () => ({
            fields: null,
            changes: null,
            editing: null,
            On
        }),
        created() {
            this.initFields()
            this.initChanges()
        },
             owned() {
                return this.loggedUser && this.loggedUser._id === this.user._id
            }
        },
        methods: {
            initFields() {
                this.fields = [
                    {key: "description", title: "Description", value: this.user.description || "", editor: "textarea-editor"},
                    {key: "fullname", title: "Nom", value: this.user.fullname || "", editor: "textarea-editor"},
                    {key: "mail", title: "Adresse", value: this.user.mail || "", noedit: true},
                    {title: "Inscription", value: new Date(this.user.wantSuscribeDate).toLocaleString(), noedit: true},
                ]
            },
            initChanges() {
                this.changes = {_id: this.user._id}
            },
            change({key, value, newvalue}) {
                if (value !== newvalue) {
                    Vue.set(this.changes, key, newvalue)
                } else {
                    Vue.delete(this.changes, key)
                }
            },
            saved(changes) {
                Object.assign(this.user, changes)
                if (this.owned) {
                    Object.assign(this.loggedUser, changes)
                }
                this.initChanges()
                this.initFields()
            }
        }
    }
</script>