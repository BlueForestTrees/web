<template>
    <view-edit-save>

        <v-card slot="left">
            <subpage-title :title="`Groupe ${final.path || ''}`" iconClass="voice logo"/>
            <v-list two-line v-if="final.items && final.items.length">
                <draggable :list="final.items" @change="orderChanged" :options="{dragClass:'dragClass', chosenClass:'chosenClass'}">
                    <template v-for="(infoId, i) in final.items">
                        <div :key="infoId">
                            <v-list-tile @click="">
                                <v-icon color="primary" class="mr-4">apps</v-icon>
                                <info-id-dense :infoId="infoId"></info-id-dense>
                                <v-btn icon flat color="primary" @click="removeInfo(infoId)">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-list-tile>
                            <v-divider v-if="i+1 < final.items.length"/>
                        </div>
                    </template>
                </draggable>
            </v-list>
            <v-container v-else>
                <v-layout>
                    <v-card-text class="font-italic align">Le groupe est vide</v-card-text>
                </v-layout>
            </v-container>
        </v-card>

        <v-card slot="right">
            <subpage-title icon="edit" title="Modifier"/>
            <editor v-model="editing"
                    :initial="initial" :changes="changes" :editor="editor"
                    @change="change"
            />
        </v-card>

        <saver slot="bottom" v-if="!editing" updated-text="Groupe mis à jour"
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.SAVE_GROUP" :update-action="On.UPDATE_INFO" :delete-action="On.DELETE_INFO"
               @saved="saved" @deleted="deleted"
               :route="route"
        />

    </view-edit-save>

</template>
<script>
    import On from "../../const/on"
    import draggable from 'vuedraggable'
    import InfoLoader from "./InfoLoader"
    import InfoIdDense from "../home/InfoIdDense"
    import Connected from "../mixin/Connected"
    import SubpageTitle from "../tree/SubpageTitle"
    import ViewEditSave from "./ViewEditSave"
    import Editor from "../common/Editor"
    import Vue from "vue"
    import Saver from "../editor/Saver"
    import {GO} from "../../const/go"
    import Edition from "../editor/Edition"

    export default {
        name: "create-group",
        mixins: [InfoLoader, Connected, Edition],
        components: {Saver, Editor, ViewEditSave, SubpageTitle, InfoIdDense, draggable},
        data: () => ({On}),
        methods: {
            removeInfo(infoId) {
                const items = this.final.items.slice()
                items.splice(this.final.items.indexOf(infoId), 1)
                Vue.set(this.changes, "items", items)
            },
            orderChanged() {
                const items = this.final.items.slice()
                Vue.set(this.changes, "items", items)
            }
        },
        computed: {
            editor() {
                return [
                    {key: "path", title: "Nom", editor: "path-editor"},
                    {key: "description", title: "Commentaire", editor: "textarea-editor", optional: true},
                    {key: "items", title: "Information", editor: "information-picker", displayFct: i => i && i.length}
                ]
            },
            route() {
                return this.final.path && {name: GO.INFO, params: {path: this.final.path}} || null
            }
        }
    }
</script>