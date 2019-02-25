<template>
    <view-edit-save>

        <v-card slot="left">
            <subpage-title iconClass="voice logo" title="Equivalence"/>
            <comp-show :info="final"/>
        </v-card>

        <v-card slot="right">
            <subpage-title icon="edit" title="Modifier"/>
            <editor v-model="editing"
                    :initial="initial" :changes="changes" :editor="editor"
                    @change="change"
            />
        </v-card>

        <saver slot="bottom" v-if="!editing" updated-text="Equivalence mise à jour."
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.SAVE_COMP" :update-action="On.UPDATE_INFO" :delete-action="On.DELETE_INFO"
               @saved="saved" @deleted="deleted"
               :route="route"
        />

    </view-edit-save>
</template>
<script>
    import Card from "../common/Card"
    import Connected from "../mixin/Connected"
    import SubpageTitle from "../tree/SubpageTitle"
    import OpenMessage from "../common/OpenMessage"
    import ViewEditSave from "./ViewEditSave"
    import On from "../../const/on"
    import Editor from "../common/Editor"
    import Saver from "../editor/Saver"
    import {qtUnitName, name, selectionFromTree} from "../../services/calculations"
    import {GO} from "../../const/go"
    import InfoLoader from "./InfoLoader"
    import Edition from "../editor/Edition"
    import CompShow from "./CompShow"

    export default {
        name: "create-compens",
        mixins: [Connected, InfoLoader, Edition],
        components: {CompShow, Saver, Editor, ViewEditSave, OpenMessage, SubpageTitle, Card},
        data: () => ({On}),
        methods: {
            qtUnitName, name
        },
        computed: {
            editor() {
                return [
                    {key: "leftSelection", title: "Produit A", displayFct: qtUnitName, editor: "tree-selection-picker"},
                    {
                        key: "fragment", title: "Comparateur", displayFct: name, editor: "common-fragment-picker",
                        params: [this.final.leftSelection && this.final.leftSelection.trunkId, this.final.rightSelection && this.final.rightSelection.trunkId].filter(v => v),
                        noedit: !(this.final.rightSelection || this.final.leftSelection)
                    },
                    {key: "rightSelection", title: "Produit B", displayFct: name, editor: "tree-selection-picker"},
                    {key: "path", title: "Nom", editor: "path-editor"},
                    {key: "description", title: "Commentaire", editor: "textarea-editor", optional: true},
                ]
            },
            route() {
                return this.final.path && {name: GO.INFO, params: {path: this.final.path}}
            }
        },
        created() {
            if (this.$store.state.tree) {
                let leftSelection
                if (this.$store.state.tree.selection) {
                    leftSelection = this.$store.state.tree.selection
                } else {
                    leftSelection = selectionFromTree(this.$store.state.tree)
                }
                this.change({key: "leftSelection"}, leftSelection)
            }
        }
    }
</script>