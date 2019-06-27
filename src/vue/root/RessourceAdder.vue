<template>
    <div>
        <editor v-model="editing" :edit-idx="0" solo
                :initial="initial" :changes="changes" :editor="editor"
                @change="change"
        />
        <saver v-if="!editing" :saved-text="savedText"
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="saveAction" @saved="saved"
        />
    </div>
</template>

<script>
    import {name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import TreeSelectionPicker from "../tree/TreeSelectionPicker"
    import Edition from "../editor/Edition"
    import Saver from "../editor/Saver"
    import Editor from "../common/Editor"

    export default {
        name: "ressource-adder",
        props: {tree: Object, reversed: {type: Boolean, default: false}},
        mixins: [Edition],
        components: {Editor, Saver, TreeSelectionPicker},
        data: () => ({
            editing: false,
            GO, On
        }),
        computed: {
            editor() {
                return [{key: "root", displayFct: qtUnitName, editor: "tree-selection-picker", props: {returnTree: true}}]
            },
            saveAction() {
                return this.reversed ? On.ADD_BRANCH : On.ADD_ROOT
            },
            savedText() {
                return this.reversed ? "Utilisation ajoutée" : "Ressource ajoutée"
            }
        },
        created() {
            this.change({key: "tree"}, this.tree)
        },
        methods: {
            name,
            onSaved() {
                this.$emit('close')
            }
        }
    }
</script>