<template>
    <view-edit-save>

        <v-card slot="left">
            <subpage-title iconClass="voice logo" title="Créer une équivalence"/>
            <v-container>
                <eq-show :info="final"/>
            </v-container>
        </v-card>

        <v-card slot="right">
            <editor v-model="editing"
                    :initial="initial" :changes="changes" :editor="editor"
                    @change="change"
            />
        </v-card>

        <saver slot="bottom" v-if="!editing" updated-text="Equivalence mise à jour." saved-text="Equivalence crée."
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.SAVE_EQ" :update-action="On.UPDATE_INFO" :delete-action="On.DELETE_INFO"
               @saved="saved" @deleted="deleted"
               :route="route"
        />

    </view-edit-save>

</template>
<script>
    import {name, qtUnitName, selectionFromTree} from "../../services/calculations"
    import On from "../../const/on"
    import InfoLoader from "./InfoLoader"
    import SubpageTitle from "../tree/SubpageTitle"
    import Connected from "../mixin/Connected"
    import ViewEditSave from "./ViewEditSave"
    import Editor from "../common/Editor"
    import Saver from "../editor/Saver"
    import EqShow from "./Eq"
    import {GO} from "../../const/go"
    import Edition from "../editor/Edition"

    export default {
        name: "create-eq",
        mixins: [InfoLoader, Connected, Edition],
        components: {ViewEditSave, EqShow, Saver, Editor, SubpageTitle},
        props: ['path'],
        data: () => ({On}),
        methods: {
            qtUnitName, name
        },
        computed: {
            editor() {
                return [
                    {key: "leftSelection", title: "Produit A", displayFct: qtUnitName, editor: "tree-selection-picker", props: {noCreate: true}},
                    {
                        key: "fragment", title: "Comparateur", displayFct: name, editor: "common-fragment-picker",
                        props: {
                            treesIds: [
                                this.final.leftSelection && this.final.leftSelection.trunkId,
                                this.final.rightSelection && this.final.rightSelection.trunkId
                            ].filter(v => v)
                        },
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