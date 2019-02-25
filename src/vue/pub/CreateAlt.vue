<template>

    <view-edit-save>

        <v-card slot="left">
            <subpage-title :title="`Alternative: ${final.path || ''}`" iconClass="voice logo"/>
            <alt-show :info="final"/>
        </v-card>

        <v-card slot="right">
            <subpage-title icon="edit" title="Modifier"/>
            <editor v-model="editing"
                    :initial="initial" :changes="changes" :editor="editor"
                    @change="change"
            />
        </v-card>

        <saver slot="bottom" v-if="!editing" updated-text="Alternative mise à jour."
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.SAVE_ALT" :update-action="On.UPDATE_INFO" :delete-action="On.DELETE_INFO"
               @saved="saved" @deleted="deleted"
               :route="route"
        />

    </view-edit-save>


</template>
<script>
    import {name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import InfoLoader from "./InfoLoader"
    import SubpageTitle from "../tree/SubpageTitle"
    import Connected from "../mixin/Connected"
    import ViewEditSave from "./ViewEditSave"
    import AltShow from "./Alt"
    import Editor from "../common/Editor"
    import Saver from "../editor/Saver"
    import {GO} from "../../const/go"
    import Edition from "../editor/Edition"

    export default {
        name: "create-alt",
        components: {Saver, Editor, AltShow, ViewEditSave, SubpageTitle},
        mixins: [InfoLoader, Connected, Edition],
        data: () => ({On}),
        methods: {
            qtUnitName, name
        },
        computed: {
            editor() {
                return [
                    {key: "leftSelection", title: "Produit A", displayFct: qtUnitName, editor: "tree-selection-picker"},
                    {key: "rightSelection", title: "Produit B", displayFct: qtUnitName, editor: "tree-selection-picker"},
                    {
                        key: "fragment", title: "Comparateur", displayFct: name, editor: "common-fragment-picker",
                        params: [
                            this.final.leftSelection && this.final.leftSelection.trunkId,
                            this.final.rightSelection && this.final.rightSelection.trunkId,
                            this.final.equivSelection && this.final.equivSelection.trunkId
                        ].filter(v => v),
                        noedit: !(this.final.rightSelection || this.final.leftSelection || this.final.equivSelection)
                    },
                    {key: "equivSelection", title: "Produit C", displayFct: name, editor: "tree-selection-picker"},
                    {key: "path", title: "Nom", editor: "path-editor"},
                    {key: "description", title: "Commentaire", editor: "textarea-editor", optional: true},
                ]
            },
            route() {
                return this.final.path && {name: GO.INFO, params: {path: this.final.path}}
            }
        },

    }
</script>