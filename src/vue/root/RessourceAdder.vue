<template>
    <div>
        <v-card>
            <subpage-title title="Ajouter une ressource" icon-class="root-add logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>
            <v-divider/>

            <v-container>
                <order-picker @revert="revert" :up="final.tree" :down="final.root"/>
            </v-container>
            <v-divider/>
            <editor v-model="editing" :editor="editor" :initial="initial" :changes="changes" @change="change"/>

            <add-entry-fab title="Créer un produit ou un service" :route="GO.CREATE_TREE" :callback="On.NAV_PREVIOUS"/>
        </v-card>
        <saver v-if="!editing" saved-text="Ressource ajoutée"
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :save-action="On.ADD_ROOT" @saved="saved"
        />
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
    import Destination from "../common/Destination"
    import OrderPicker from "../common/OrderPicker"
    import TreePicker from "../tree/TreePicker"
    import Editor from "../common/Editor"
    import Edition from "../editor/Edition"
    import Saver from "../editor/Saver"

    export default {
        name: "ressource-adder",
        props: ['tree'],
        mixins: [Edition],
        components: {Saver, Editor, TreePicker, OrderPicker, Destination, AddEntryFab, SubpageTitle, TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            editing: false,
            GO, On
        }),
        computed: {
            editor() {
                const canChangeTree = this.final.tree && this.final.tree._id !== this.tree._id
                const canChangeRoot = !canChangeTree
                return [
                    {key: "tree", title: "Produit A", displayFct: qtUnitName, editor: "tree-selection-picker", props: {canChangeTree}},
                    {key: "root", title: "Produit B", displayFct: qtUnitName, editor: "tree-selection-picker", props: {canChangeTree: canChangeRoot}},
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