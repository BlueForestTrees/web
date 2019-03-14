<template>
    <div>

        <tree-selection-picker :returnTree="true" @save="select"/>

        <saver v-if="!editing" saved-text="Ressource ajoutée"
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.ADD_ROOT" @saved="saved"
        />
    </div>
</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import TreeSelectionPicker from "../tree/TreeSelectionPicker"
    import SubpageTitle from "../tree/SubpageTitle"
    import AddEntryFab from "../common/AddEntryFab"
    import TreePicker from "../tree/TreePicker"
    import Edition from "../editor/Edition"
    import Saver from "../editor/Saver"

    export default {
        name: "ressource-adder",
        props: ['tree', 'reverted'],
        mixins: [Edition],
        components: {Saver, TreePicker, AddEntryFab, SubpageTitle, TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            editing: false,
            GO, On
        }),
        computed: {
            editor() {
                return [
                    {key: "tree"},
                    {key: "root"}
                ]
            }
        },
        created() {
            this.change({key: "tree"}, this.tree)
            if (this.reverted) {
                this.revert()
            }
        },
        methods: {
            name,
            revert() {
                const tmp = this.final.tree
                this.change({key: "tree"}, this.final.root)
                this.change({key: "root"}, tmp)
            },
            select(root) {
                this.change({key: "root"}, root)
            },
            saved() {
                this.$emit('close')
            }
        }
    }
</script>