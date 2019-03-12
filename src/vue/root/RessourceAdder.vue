<template>
    <div>
        <v-card>
            <subpage-title sub title="Ajouter une ressource" icon-class="root-add logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>
            <v-divider/>

            <v-layout row align-center>
                <v-flex class="font-weight-thin subheading ml-2">{{text}}</v-flex>
                <v-spacer/>
                <v-btn v-if="!editing" icon @click.stop="revert">
                    <v-icon large color="primary">{{$vuetify.breakpoint.smAndUp ? 'swap_horiz':'swap_vert'}}</v-icon>
                </v-btn>
            </v-layout>

            <v-divider/>
            <editor v-model="editing" :editor="editor" :initial="initial" :changes="changes" @change="change"/>

            <saver v-if="!editing" saved-text="Ressource ajoutée"
                   :initial="initial" :changes="changes" :final="final" :editor="editor"
                   :save-action="On.ADD_ROOT" @saved="saved"
            />
        </v-card>
    </div>
</template>

<script>
    import Closer from "../common/Closer"
    import {name, qtUnitName} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import TreeSelectionPicker from "../tree/TreeSelectionPicker"
    import SubpageTitle from "../tree/SubpageTitle"
    import AddEntryFab from "../common/AddEntryFab"
    import TreePicker from "../tree/TreePicker"
    import Editor from "../common/Editor"
    import Edition from "../editor/Edition"
    import Saver from "../editor/Saver"

    export default {
        name: "ressource-adder",
        props: ['tree'],
        mixins: [Edition],
        components: {Saver, Editor, TreePicker, AddEntryFab, SubpageTitle, TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            editing: false,
            GO, On
        }),
        computed: {
            text() {
                return `${this.final.tree && qtUnitName(this.final.tree.selection) || "'A'"} contient ${this.final.root && qtUnitName(this.final.root.selection) || "'B'"}`
            },
            editor() {
                const canChangeTree = this.final.tree && this.final.tree._id !== this.tree._id
                const canChangeRoot = !canChangeTree
                return [
                    {key: "tree", title: "A", displayFct: qtUnitName, editor: "tree-selection-picker", props: {canChangeTree, returnTree: true}},
                    {key: "root", title: "B", displayFct: qtUnitName, editor: "tree-selection-picker", props: {canChangeTree: canChangeRoot, returnTree: true}}
                ]
            }
        },
        created() {
            this.change({key: "tree"}, this.tree)
        },
        methods: {
            name,
            revert() {
                const tmp = this.final.tree
                this.change({key: "tree"}, this.final.root)
                this.change({key: "root"}, tmp)
            },
            saved() {
                this.$emit('close')
            }
        }
    }
</script>